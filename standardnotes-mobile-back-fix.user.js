// ==UserScript==
// @name         Standard Notes - Fix Mobile Back Button ⏪
// @name:ja      Standard Notes 編集画面の「戻る」動作を修正 ⏪
// @name:en      Standard Notes - Fix Mobile Back Button ⏪
// @name:zh-CN   修复 Standard Notes 编辑页的返回按钮行为 ⏪
// @name:zh-TW   修復 Standard Notes 編輯頁的返回按鈕行為 ⏪
// @name:ko      Standard Notes 편집 화면의 뒤로가기 동작 수정 ⏪
// @name:fr      Standard Notes - Correction du bouton retour ⏪
// @name:es      Standard Notes - Corregir botón de retroceso ⏪
// @name:de      Standard Notes - Zurück-Button reparieren ⏪
// @name:pt-BR   Standard Notes - Corrigir botão de voltar ⏪
// @name:ru      Standard Notes - Исправить кнопку Назад ⏪
// @version      1.2.0
// @description         Fixes back button behavior on Standard Notes web: pressing browser's back returns to note list, not closing the app. Supports both header and footer buttons.
// @description:ja      Standard Notesのウェブ版で、編集画面からブラウザの「戻る」でノート一覧に戻れるように修正。ヘッダー/フッターのボタンに対応。
// @description:en      Fixes back button behavior on Standard Notes web: pressing browser's back returns to note list, not closing the app. Supports both header and footer buttons.
// @description:zh-CN   修复 Standard Notes 网页版中的返回按钮行为：点击浏览器返回按钮将返回笔记列表，而不是关闭应用。支持页眉和页脚按钮。
// @description:zh-TW   修復 Standard Notes 網頁版的返回按鈕行為：點擊瀏覽器的返回鍵將回到筆記列表，而非關閉應用程式。支援上方與下方的返回按鈕。
// @description:ko      Standard Notes 웹앱에서 브라우저의 뒤로가기 버튼을 눌렀을 때 앱이 종료되지 않고 노트 목록으로 돌아가도록 수정합니다. 상단/하단 버튼 모두 지원됩니다.
// @description:fr      Corrige le comportement du bouton retour sur Standard Notes : le bouton retour du navigateur ramène à la liste des notes au lieu de fermer l'application. Prend en charge les boutons en haut et en bas.
// @description:es      Corrige el comportamiento del botón de retroceso en Standard Notes: al presionar el botón de retroceso del navegador, se regresa a la lista de notas en lugar de cerrar la aplicación. Compatible con los botones superior e inferior.
// @description:de      Behebt das Zurück-Button-Verhalten in Standard Notes: Der Browser-Zurück-Button führt zur Notizliste statt die App zu schließen. Unterstützt sowohl Kopf- als auch Fußzeilen-Schaltflächen.
// @description:pt-BR   Corrige o comportamento do botão voltar no Standard Notes Web: pressionar o botão do navegador retorna à lista de notas, sem fechar o app. Suporte para botões no topo e rodapé.
// @description:ru      Исправляет поведение кнопки "Назад" в Standard Notes: при нажатии кнопки браузера возвращает к списку заметок вместо закрытия приложения. Поддержка кнопок в заголовке и нижнем колонтитуле.
// @namespace    https://github.com/koyasi777/standard-notes-mobile-back-fix
// @author       koyasi777
// @match        https://app.standardnotes.com/*
// @grant        none
// @license      MIT
// @run-at       document-idle
// @homepageURL  https://github.com/koyasi777/standard-notes-mobile-back-fix
// @supportURL   https://github.com/koyasi777/standard-notes-mobile-back-fix/issues
// @icon         https://app.standardnotes.com/favicon/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    // The selector for ANY "back to list" button.
    // Both the header and footer buttons share this stable aria-label identifier.
    const backButtonSelector = 'button[aria-label="Go to items list"]';

    // A flag to prevent duplicate history pushes
    let isHistoryStatePushed = false;

    console.log('Standard Notes Back-Fix script loaded (v1.2).');

    /**
     * This function checks if a "Go to items list" button is visible anywhere on the page.
     * If so, it pushes a state to the browser history. This allows us to intercept the 'popstate'
     * event (the back button action) without the browser actually leaving the page.
     * This logic is more robust as it doesn't depend on a specific container like a title bar.
     */
    const addHistoryStateIfNavigableBack = () => {
        const backButton = document.querySelector(backButtonSelector);

        if (backButton && !isHistoryStatePushed) {
            // A back button is visible, which means we are in a view we can navigate back from.
            // Push a new state to the history stack.
            history.pushState({ snBackFix: true }, '');
            isHistoryStatePushed = true;
            console.log('Back-navigable view detected, history state pushed.');
        } else if (!backButton && isHistoryStatePushed) {
            // No back button is found, so we are likely on the main list view. Reset the flag.
            // This happens when the user navigates back to the list.
            isHistoryStatePushed = false;
            console.log('Main view detected, history state reset.');
        }
    };

    /**
     * This is the handler for the 'popstate' event, which fires when the user
     * navigates through their session history (e.g., using the back/forward button).
     * @param {PopStateEvent} event - The popstate event object.
     */
    const handleBackButton = (event) => {
        // We only care about this event if our custom state was just popped.
        if (!isHistoryStatePushed) {
            return;
        }

        console.log('popstate event detected.');
        const backButton = document.querySelector(backButtonSelector);

        // If the back button exists, it means we can programmatically navigate back.
        if (backButton) {
            console.log('Back button found. Simulating click.');
            // Simulate a click on the app's own back button.
            // This triggers the app's native navigation logic.
            backButton.click();
            // Reset the flag immediately after handling it.
            isHistoryStatePushed = false;
        }
    };

    // Listen for the popstate event.
    window.addEventListener('popstate', handleBackButton);

    // Because Standard Notes is a Single Page Application (SPA), the content
    // is loaded dynamically. We need to monitor the DOM for changes to detect
    // when a back button appears or disappears.
    const observer = new MutationObserver(addHistoryStateIfNavigableBack);

    // Start observing the entire document for additions/removals of elements.
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
