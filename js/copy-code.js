function addCopyButtonsToCodeChunks() {
    const codeBlocks = document.querySelectorAll('div.sourceCode pre.sourceCode, pre code');
    codeBlocks.forEach(block => {
        let preElement;
        let codeElement;

        if (block.tagName === 'PRE' && block.classList.contains('sourceCode')) {
            preElement = block;
            codeElement = block.querySelector('code');
        } else if (block.tagName === 'CODE' && block.parentElement.tagName === 'PRE') {

            preElement = block.parentElement;
            codeElement = block;
        } else {
            return;
        }

        if (!codeElement) {
            codeElement = preElement;
        }
        if (preElement.querySelector('.btn-copy-code')) {
            return;
        }

        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-secondary btn-copy-code';
        btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';

        btn.addEventListener('click', () => {
            const codeToCopy = codeElement.textContent || "";
            navigator.clipboard.writeText(codeToCopy).then(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-secondary');
                }, 2500);
            }).catch(err => {
                console.error('Error copying text: ', err);
                btn.textContent = 'Error';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                }, 2500);
            });
        });
        preElement.style.position = 'relative';
        preElement.insertBefore(btn, preElement.firstChild);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof navigator.clipboard !== 'undefined') {
        addCopyButtonsToCodeChunks();
    } else {
        console.log('Clipboard API not available, copy buttons not added.');
    }
});