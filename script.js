document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video-background');
    var pageContent = document.getElementById('page-content');

    // 在视频播放结束后显示网页内容
    video.addEventListener('ended', function() {
        pageContent.classList.add('fade-in');
    });

    // 页面加载时执行的函数
    function onPageLoad() {
        // 获取按钮元素
        var button = document.querySelector('.card');

        // 添加点击事件监听器
        button.addEventListener('click', function() {
            // 跳转到 "yet.html"
            window.location.href = "./yet.html";
        });

        console.log("Page loaded.");
    }

    // 页面加载完成时调用 onPageLoad 函数
    window.addEventListener('load', onPageLoad);
});
