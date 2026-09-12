// ========== SISTEMAS UTILITÁRIOS E UI ==========

// Toast reutilizável (mensagem flutuante)
function createToast(text) {
    const message = document.createElement('div');
    message.textContent = text;
    Object.assign(message.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#ff2d55',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        zIndex: 10000,
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'opacity 0.5s',
        opacity: '1',
    });
    // Remove toasts anteriores iguais
    const existing = document.querySelectorAll('.custom-search-toast');
    existing.forEach(n => n.parentNode && n.parentNode.removeChild(n));
    message.className = 'custom-search-toast';
    document.body.appendChild(message);
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            if (message.parentNode) message.parentNode.removeChild(message);
        }, 500);
    }, 2000);
}

// Mensagem de busca desabilitada (global)
window.showSearchDisabledMessage = function () {
    createToast('�