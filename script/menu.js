
const moreButton = document.querySelector('.more');
const moreMenu = document.querySelector('.more-menu');

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = e.currentTarget.classList[1];
        
        switch(action) {
            case 'copy':
                navigator.clipboard.writeText(/* 복사할 텍스트 */);
                break;
            case 'download':
                // 다운로드 로직
                break;
            case 'edit':
                // 수정 로직
                break;
            case 'recognize':
                // 재인식 로직
                break;
            case 'delete':
                // 삭제 로직
                break;
        }
    });
});
