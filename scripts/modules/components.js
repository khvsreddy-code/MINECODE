/**
 * UI COMPONENTS - JavaScript
 * Toast, Modal, Tooltip APIs
 */

const UIComponents = {
    // ==========================================================
    // TOAST NOTIFICATIONS
    // ==========================================================

    toastContainer: null,

    initToasts() {
        if (document.querySelector('.toast-container')) return;
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'toast-container';
        document.body.appendChild(this.toastContainer);
    },

    toast(message, type = 'info', duration = 4000) {
        if (!this.toastContainer) this.initToasts();

        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
            warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12,9 L12,13"/><path d="M12,17 L12.01,17"/><path d="M10.29,3.86 L1.82,18 C1.64,18.3 1.64,18.69 1.82,19 C2,19.31 2.32,19.5 2.68,19.5 L21.32,19.5 C21.68,19.5 22,19.31 22.18,19 C22.36,18.69 22.36,18.3 22.18,18 L13.71,3.86 C13.53,3.56 13.21,3.38 12.86,3.38 C12.51,3.38 12.19,3.56 12.01,3.86 L10.29,3.86 Z"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;

        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    },

    // ==========================================================
    // MODAL
    // ==========================================================

    showModal({ title = 'Modal', content = '', onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) {
        // Remove existing modal
        const existing = document.querySelector('.modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">${content}</div>
                <div class="modal-footer">
                    <button class="btn-cyber-outline modal-cancel">${cancelText}</button>
                    <button class="btn-cyber-primary modal-confirm">${confirmText}</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Event handlers
        const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        };

        overlay.querySelector('.modal-close').addEventListener('click', () => {
            closeModal();
            onCancel?.();
        });

        overlay.querySelector('.modal-cancel').addEventListener('click', () => {
            closeModal();
            onCancel?.();
        });

        overlay.querySelector('.modal-confirm').addEventListener('click', () => {
            closeModal();
            onConfirm?.();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
                onCancel?.();
            }
        });

        return { close: closeModal };
    },

    // ==========================================================
    // TOOLTIPS
    // ==========================================================

    initTooltips() {
        // Create tooltip element if not exists
        if (!document.getElementById('cyber-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'cyber-tooltip';
            tooltip.className = 'cyber-tooltip';
            document.body.appendChild(tooltip);
        }

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                this.showTooltip(target, target.dataset.tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                this.hideTooltip();
            }
        });
    },

    showTooltip(element, text) {
        const tooltip = document.getElementById('cyber-tooltip');
        tooltip.textContent = text;
        tooltip.classList.add('visible');

        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

        // Boundary checks
        if (top < 0) top = rect.bottom + 8;
        if (left < 0) left = 8;
        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 8;

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    },

    hideTooltip() {
        const tooltip = document.getElementById('cyber-tooltip');
        tooltip.classList.remove('visible');
    },

    // ==========================================================
    // BREADCRUMBS
    // ==========================================================

    renderBreadcrumbs(items, containerId = 'dashboard-breadcrumbs') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = items.map((item, i) => {
            const isLast = i === items.length - 1;
            if (isLast) {
                return `<span class="current" style="font-family: var(--font-code); color: var(--neon-cyan);">${item.label}</span>`;
            }
            return `
                <a href="#" data-route="${item.route}" style="font-family: var(--font-code); color: var(--text-secondary);">${item.label}</a>
                <span class="separator" style="margin: 0 8px; color: var(--text-muted);">/</span>
            `;
        }).join('');
    }
};

// Global shortcut
window.showToast = (msg, type, duration) => UIComponents.toast(msg, type, duration);
window.showModal = (opts) => UIComponents.showModal(opts);
window.UIComponents = UIComponents;

// Auto-init toasts
document.addEventListener('DOMContentLoaded', () => UIComponents.initToasts());
