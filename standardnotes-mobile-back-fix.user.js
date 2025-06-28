// ==UserScript==
// @name         Standard Notes - ブラウザの「戻る」で前画面に戻れるようにする ⏪
// @name:ja      Standard Notes - ブラウザの「戻る」で前画面に戻れるようにする ⏪
// @name:en      Standard Notes - Enable Browser Back to Previous View ⏪
// @name:zh-CN   Standard Notes - 浏览器返回操作返回前一个视图 ⏪
// @name:zh-TW   Standard Notes - 使用瀏覽器返回鍵回到前一畫面 ⏪
// @name:ko      Standard Notes - 브라우저 뒤로가기 시 이전 화면으로 이동 ⏪
// @name:fr      Standard Notes - Revenir à l’écran précédent avec le bouton retour ⏪
// @name:es      Standard Notes - Volver a la vista anterior con el botón del navegador ⏪
// @name:de      Standard Notes - Mit dem Zurück-Button zur vorherigen Ansicht ⏪
// @name:pt-BR   Standard Notes - Voltar para a tela anterior com o botão do navegador ⏪
// @name:ru      Standard Notes - Переход к предыдущему экрану по кнопке Назад ⏪
// @version      1.5.0
// @description         Makes the browser back button return to the previous screen inside Standard Notes (e.g. notes, tags, settings), instead of closing the tab.
// @description:ja      Standard Notesのウェブ版で、ブラウザの「戻る」操作によりノート一覧・タグ・検索・設定などの前画面に戻れるようにします。タブが閉じることなく、自然なナビゲーションを実現します。
// @description:en      Makes the browser back button return to the previous screen inside Standard Notes (e.g. notes, tags, settings), instead of closing the tab.
// @description:zh-CN   让 Standard Notes 中的浏览器返回操作跳转到前一个页面（如笔记、标签、设置），而不是关闭标签页。
// @description:zh-TW   讓 Standard Notes 中的瀏覽器返回操作回到前一頁（如筆記、標籤、設定），而非關閉分頁。
// @description:ko      Standard Notes 웹에서 브라우저 뒤로가기를 누르면 이전 화면(노트, 태그, 설정 등)으로 돌아가며, 탭이 닫히지 않습니다。
// @description:fr      Permet au bouton retour du navigateur de revenir à l’écran précédent dans Standard Notes (notes, tags, paramètres), au lieu de fermer l’onglet.
// @description:es      Hace que el botón de retroceso del navegador vuelva a la pantalla anterior en Standard Notes (notas, etiquetas, configuración), en lugar de cerrar la pestaña.
// @description:de      Lässt den Browser-Zurück-Button in Standard Notes zur vorherigen Ansicht zurückkehren (z. B. Notizen, Tags, Einstellungen), ohne den Tab zu schließen.
// @description:pt-BR   Faz o botão de voltar do navegador retornar à tela anterior no Standard Notes (notas, tags, configurações), sem fechar a aba.
// @description:ru      Делает кнопку «Назад» в браузере работающей в Standard Notes — возвращает к предыдущему экрану (заметки, теги, настройки) вместо закрытия вкладки.
// @namespace    https://github.com/koyasi777/standardnotes-mobile-back-fix
// @author       koyasi777
// @match        https://app.standardnotes.com/*
// @grant        none
// @license      MIT
// @run-at       document-start
// @homepageURL  https://github.com/koyasi777/standardnotes-mobile-back-fix
// @supportURL   https://github.com/koyasi777/standardnotes-mobile-back-fix/issues
// @icon         https://app.standardnotes.com/favicon/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    const backButtonSelector = 'button[aria-label="Go to items list"]';
    let isHistoryStatePushed = false;
    let debounceTimer = null;

    function syncHistoryState() {
        const backButton = document.querySelector(backButtonSelector);

        if (backButton && !isHistoryStatePushed) {
            try {
                history.pushState({ snBackFix: true }, document.title);
                isHistoryStatePushed = true;
            } catch (e) {
                console.warn('SN Back-Fix: Failed to push history state:', e);
            }
        } else if (!backButton && isHistoryStatePushed) {
            isHistoryStatePushed = false;
        }
    }

    function handlePopstate(event) {
        if (event.state && event.state.snBackFix) {
             const backButton = document.querySelector(backButtonSelector);
             if (backButton) {
                 backButton.click();
             }
        }
        isHistoryStatePushed = false;
    }

    function initialize() {
        if (window.snBackFixInitialized) return;
        window.snBackFixInitialized = true;

        window.addEventListener('popstate', handlePopstate);

        const observer = new MutationObserver(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(syncHistoryState, 150);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        syncHistoryState();
    }

    if (document.body) {
        initialize();
    } else {
        new MutationObserver((mutations, obs) => {
            if (document.body) {
                obs.disconnect();
                initialize();
            }
        }).observe(document.documentElement, { childList: true });
    }
})();
