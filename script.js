document.addEventListener('DOMContentLoaded', ()=>{
    const urlInputSection = document.getElementById('url-input-section');
    const responseSection = document.getElementById('response-section');
    const settingsSection = document.getElementById('settings-section');

    const submitButton = document.getElementById('submit-button');
    const settingButton = document.getElementById('setting-button');

    showPage(urlInputSection);

    function showPage(pageToShow) {
        // 全てのページセクションからactiveクラスを削除
        document.querySelectorAll('.page-section').forEach(section=>{
            section.classList.remove('active');
        });
        // 表示したいページセクションにactiveクラスを追加
        pageToShow.classList.add('active');
    }

    submitButton.addEventListener('click', ()=>{
        // ここでURL取得、API読み出しなどの処理
        // ...
        // 処理が終わったら結果表示画面へ
        showPage(responseSection);
    });

    // APIキー保存ボタンの処理なども同様に
    // ...
});