const moreButton = document.querySelector('.more');
const moreMenu = document.querySelector('.more-menu');

let talkToDelete = null;

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = e.currentTarget.classList[1];
        
        switch(action) {
            case 'copy':
                const talkText = item.closest('.talk-content').querySelector('.talk-text');
                navigator.clipboard.writeText(talkText.textContent);
                break;
            case 'download':
                // 다운로드 로직

                break;
            case 'edit':
                handleEdit(item);
                break;
            case 'recognize':
                // 재인식 로직
                break;
                case 'delete':
                    talkToDelete = item.closest('.talk');
                    const deletePreview = talkToDelete.querySelector('.talk-text').textContent;
                    document.getElementById('delete-confirm-modal').classList.remove('hidden');
                    document.querySelector('.modal-delete-preview').textContent = deletePreview;
                    break;
        }
    });
});

const handleEdit = (menuItem) => {
    const talk = menuItem.closest('.talk');
    const talkContent = menuItem.closest('.talk-content');
    const talkText = talkContent.querySelector('.talk-text');
    const underBar = talkContent.querySelector('.under-bar');

    const originalText = talkText.innerHTML.replace(/<br\s*\/?>/g, '\n').trim();
    
    talk.classList.add('editing');
    
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.classList.add('edit-textarea');
    talkText.replaceWith(textarea);
    textarea.focus();

    const infoText = document.createElement('div');
    infoText.textContent = "ESC 키로 취소 • Enter 키로 저장";
    infoText.classList.add('edit-info');
    underBar.appendChild(infoText);

    const finishEditing = () => {
        talk.classList.remove('editing');
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const newText = textarea.value.trim();
            const newTalkText = document.createElement('p');
            newTalkText.classList.add('talk-text');
            newTalkText.innerHTML = newText.replace(/\n/g, '<br>');
            textarea.replaceWith(newTalkText);
            infoText.remove();
            finishEditing();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            const newTalkText = document.createElement('p');
            newTalkText.classList.add('talk-text');
            newTalkText.innerHTML = originalText.replace(/\n/g, '<br>');
            textarea.replaceWith(newTalkText);
            infoText.remove();
            finishEditing();
        }
    });
};

document.getElementById('confirm-delete').addEventListener('click', () => {
    if (talkToDelete) {
        talkToDelete.classList.add('removing');
        talkToDelete.addEventListener('transitionend', () => {
            talkToDelete.remove();
        });
        talkToDelete = null;
    }
    document.getElementById('delete-confirm-modal').classList.add('hidden');
});

document.getElementById('cancel-delete').addEventListener('click', () => {
    talkToDelete = null;
    document.getElementById('delete-confirm-modal').classList.add('hidden');
});



