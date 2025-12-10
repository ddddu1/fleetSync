// ===== GLOBAL FUNCTIONS =====

// Set current date in header
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

// Close demo notice
function initDemoNotice() {
    const closeButtons = document.querySelectorAll('.close-notice');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notice = this.closest('.demo-notice');
            notice.style.opacity = '0';
            notice.style.height = '0';
            notice.style.margin = '0';
            notice.style.padding = '0';
            notice.style.overflow = 'hidden';
            
            setTimeout(() => {
                notice.remove();
            }, 300);
        });
    });
}

// Initialize chart interactions
function initChartInteractions() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const value = this.getAttribute('data-value');
            const tooltip = this.querySelector('.chart-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.chart-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
            }
        });
    });
}

// Initialize vehicle marker interactions
function initVehicleMarkers() {
    const markers = document.querySelectorAll('.vehicle-marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        marker.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
            }
        });
    });
}

// Initialize settings tabs
function initSettingsTabs() {
    const tabItems = document.querySelectorAll('.settings-nav-item');
    const tabPanels = document.querySelectorAll('.settings-panel');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const panel = document.getElementById(`${tabId}-panel`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

// Initialize theme selector
function initThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would save the theme preference
            // and apply it to the entire application
            const theme = this.querySelector('span').textContent.toLowerCase();
            console.log(`Theme changed to: ${theme}`);
            
            // Show a notification
            showNotification(`Theme changed to ${theme} mode`);
        });
    });
}

// Initialize toggle switches
function initToggleSwitches() {
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(switchElement => {
        switchElement.addEventListener('change', function() {
            const settingName = this.closest('.setting-item')?.querySelector('h4')?.textContent;
            const isChecked = this.checked;
            console.log(`${settingName}: ${isChecked ? 'Enabled' : 'Disabled'}`);
            
            // Show a notification
            showNotification(`${settingName} ${isChecked ? 'enabled' : 'disabled'}`);
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification-toast {
            position: fixed;
            top: 30px;
            right: 30px;
            background-color: white;
            border-radius: 10px;
            padding: 16px 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            min-width: 300px;
            max-width: 400px;
            z-index: 1000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid #2563eb;
        }
        
        .notification-toast.success {
            border-left-color: #10b981;
        }
        
        .notification-toast.error {
            border-left-color: #ef4444;
        }
        
        .notification-toast.warning {
            border-left-color: #f59e0b;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-grow: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-toast.success .notification-content i {
            color: #10b981;
        }
        
        .notification-toast.error .notification-content i {
            color: #ef4444;
        }
        
        .notification-toast.warning .notification-content i {
            color: #f59e0b;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #64748b;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #1e293b;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Save settings button
function initSaveSettingsButton() {
    const saveButton = document.getElementById('save-settings');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Show saving state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success notification
                showNotification('Settings saved successfully!', 'success');
            }, 1500);
        });
    }
}

// Initialize copy functionality for API key
function initCopyAPIKey() {
    const copyButton = document.querySelector('.api-key .btn-icon');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const apiKeyElement = document.querySelector('.api-key-value');
            if (apiKeyElement) {
                const apiKey = apiKeyElement.textContent;
                navigator.clipboard.writeText(apiKey).then(() => {
                    // Show copied state
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.style.color = '#10b981';
                    
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                        this.style.color = '';
                    }, 2000);
                    
                    showNotification('API key copied to clipboard!', 'success');
                });
            }
        });
    }
}

// Initialize form controls
function initFormControls() {
    // Number input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('change', function() {
            const min = parseInt(this.getAttribute('min')) || 0;
            const max = parseInt(this.getAttribute('max')) || 100;
            let value = parseInt(this.value) || min;
            
            if (value < min) value = min;
            if (value > max) value = max;
            
            this.value = value;
        });
    });
    
    // Select elements
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            const settingName = this.closest('.setting-item')?.querySelector('h4')?.textContent;
            console.log(`${settingName} changed to: ${this.value}`);
        });
    });
}

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'vehicles.html') {
        initVehiclesPage();
    } else if (currentPage === 'analytics.html') {
        initAnalyticsPage();
    } else if (currentPage === 'settings.html') {
        initSettingsPage();
    }
}

// Vehicles page specific initialization
function initVehiclesPage() {
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.querySelector('.fa-list')) {
                // List view
                vehiclesGrid.classList.add('list-view');
            } else {
                // Grid view
                vehiclesGrid.classList.remove('list-view');
            }
        });
    });
    
    // Add list view styles
    const style = document.createElement('style');
    style.textContent = `
        .vehicles-grid.list-view {
            grid-template-columns: 1fr;
        }
        
        .vehicles-grid.list-view .vehicle-card {
            flex-direction: row;
            align-items: center;
            gap: 20px;
        }
        
        .vehicles-grid.list-view .vehicle-image {
            width: 80px;
            height: 80px;
            margin-bottom: 0;
            flex-shrink: 0;
        }
        
        .vehicles-grid.list-view .vehicle-info {
            margin-bottom: 0;
            flex-grow: 1;
        }
        
        .vehicles-grid.list-view .vehicle-actions {
            flex-shrink: 0;
        }
        
        @media (max-width: 768px) {
            .vehicles-grid.list-view .vehicle-card {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('.fa-chevron-left, .fa-chevron-right')) return;
            
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            showNotification(`Navigated to page ${this.textContent}`);
        });
    });
}

// Analytics page specific initialization
function initAnalyticsPage() {
    // Time period selector
    const timeOptions = document.querySelectorAll('.time-option');
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('custom')) return;
            
            timeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.textContent;
            showNotification(`Time period changed to ${period}`);
        });
    });
    
    // Export report button
    const exportButton = document.querySelector('.btn-primary');
    if (exportButton && exportButton.textContent.includes('Export')) {
        exportButton.addEventListener('click', function() {
            // Show exporting state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
            this.disabled = true;
            
            // Simulate export process
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                showNotification('Report exported successfully!', 'success');
            }, 2000);
        });
    }
}

// Settings page specific initialization
function initSettingsPage() {
    initSettingsTabs();
    initThemeSelector();
    initToggleSwitches();
    initSaveSettingsButton();
    initCopyAPIKey();
    initFormControls();
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    setCurrentDate();
    initTooltips();
    initDemoNotice();
    initChartInteractions();
    initVehicleMarkers();
    initPageSpecific();
    
    // Add active state to current page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            const checkbox = link.querySelector('.checkbox');
            if (checkbox) {
                checkbox.classList.add('active');
            }
        } else {
            link.classList.remove('active');
            const checkbox = link.querySelector('.checkbox');
            if (checkbox) {
                checkbox.classList.remove('active');
            }
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .stat-card, .chart-card, .vehicle-card, .metric-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize all buttons with data-action
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const target = this.getAttribute('data-target');
            
            console.log(`Action: ${action}, Target: ${target}`);
            
            switch(action) {
                case 'show-modal':
                    // In a real app, you would show a modal
                    showNotification(`Modal for ${target} would open here`);
                    break;
                case 'toggle':
                    // In a real app, you would toggle something
                    const element = document.getElementById(target);
                    if (element) {
                        element.classList.toggle('active');
                    }
                    break;
                case 'refresh':
                    // In a real app, you would refresh data
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-redo"></i>';
                        showNotification('Data refreshed!');
                    }, 1000);
                    break;
            }
        });
    });
    
    // Simulate live data updates on dashboard
    if (currentPage === 'index.html' || currentPage === '') {
        setInterval(() => {
            // Update active vehicles count randomly
            const activeVehicles = document.querySelector('.stat-card:nth-child(2) .stat-value');
            if (activeVehicles) {
                const current = parseInt(activeVehicles.textContent);
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = Math.max(20, Math.min(30, current + change));
                if (newCount !== current) {
                    activeVehicles.textContent = newCount;
                    showNotification(`Active vehicles: ${newCount}`, 'info');
                }
            }
            
            // Update map markers randomly
            const markers = document.querySelectorAll('.vehicle-marker');
            markers.forEach(marker => {
                if (Math.random() > 0.7) {
                    const isActive = marker.classList.contains('active');
                    marker.classList.toggle('active');
                    marker.classList.toggle('idle');
                }
            });
        }, 10000); // Update every 10 seconds
    }
    
    console.log('FleetSync Dashboard initialized successfully!');
});