document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after animation (if loader exists)
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
            // Start stats animation after loader hides
            runStatCounters();
        }, 2500);
    }

    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Dropdown functionality - hover based (scoped to Products & Services only)
    const productsBtn = document.getElementById('productsBtn');
    const productsMenu = document.getElementById('productsMenu');
    
    if (productsBtn && productsMenu) {
        const productsDropdown = productsBtn.closest('.nav-dropdown');
        if (productsDropdown) {
            productsDropdown.addEventListener('mouseenter', function() {
                productsMenu.style.display = 'block';
                productsBtn.setAttribute('aria-expanded', 'true');
            });
            
            productsDropdown.addEventListener('mouseleave', function() {
                productsMenu.style.display = 'none';
                productsBtn.setAttribute('aria-expanded', 'false');
            });
        }
    }

    // Search bar functionality with suggestions
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    // Define searchable pages
    const searchablePages = [
        // Main pages
        { title: 'Home', keywords: 'home main front page', url: 'frontend.html' },
        { title: 'About Us - About RDB', keywords: 'about us rdb bank information', url: 'About_us.html' },
        { title: 'Bank Profile', keywords: 'bank profile overview history', url: 'Bank_Profile.html' },
        { title: 'Customer Charter', keywords: 'customer charter rights', url: 'Customer_Charter.html' },
        { title: 'Contact Us', keywords: 'contact us phone email address', url: 'contact_us.html' },
        { title: 'Branch Network', keywords: 'branch network locations find', url: 'branch_network.html' },

        // Leadership
        { title: 'Chairman', keywords: 'chairman leader head', url: 'Chairman.html' },
        { title: 'General Manager / CEO', keywords: 'general manager ceo chief executive', url: 'GeneralManager.html' },
        { title: 'Board of Directors', keywords: 'board directors governance', url: 'Board_of_Directors.html' },
        { title: 'Corporate Management', keywords: 'corporate management team', url: 'CorporateManagement.html' },
        { title: 'Executive Management', keywords: 'executive management senior', url: 'ExecutiveManagement.html' },

        // Personnel
        { title: 'Asoka Bandara', keywords: 'asoka bandara director', url: 'Asoka_Bandara.html' },
        { title: 'Chanura Wijetillake', keywords: 'chanura wijetillake', url: 'Chanura_Wijetillake.html' },
        { title: 'Kumara Bandara', keywords: 'kumara bandara', url: 'Kumara_Bandara.html' },
        { title: 'PA Wijerathne', keywords: 'pa wijerathne', url: 'PA_Wijerathne.html' },
        { title: 'Ranjith Kodituwakku', keywords: 'ranjith kodituwakku', url: 'Ranjith_Kodituwakku.html' },
        { title: 'Ramani Wijeratne', keywords: 'ramani wijeratne', url: 'Ramani_Wijeratne.html' },
        { title: 'Rohini Madurawala', keywords: 'rohini madurawala', url: 'Rohini_Madurawala.html' },
        { title: 'W Ranaweera', keywords: 'w ranaweera', url: 'W_Ranaweera.html' },
        { title: 'Wasanthe Nandasiri', keywords: 'wasanthe nandasiri', url: 'Wasanthe_Nandasiri.html' },

        // Savings & Investments
        { title: 'Savings & Investments', keywords: 'savings investments deposits interest', url: 'Savings_Investments.html' },
        { title: 'RDB Fixed Deposits', keywords: 'fixed deposits fd interest rate', url: 'rdb_fixed_deposits.html' },
        { title: 'Ethera Isuru', keywords: 'ethera isuru savings children', url: 'ethera_isuru.html' },
        { title: 'RDB Jaya Nidhana', keywords: 'jaya nidhana savings', url: 'rdb_jaya_nidhana.html' },
        { title: 'RDB Uththama', keywords: 'uththama savings senior', url: 'rdb_uththama.html' },
        { title: 'RDB Victory', keywords: 'victory savings account', url: 'rdb_victory.html' },
        { title: 'RDB New Life', keywords: 'new life savings', url: 'rdb_new_life.html' },
        { title: 'RDB Ayojana', keywords: 'ayojana savings plan', url: 'rdb_ayojana.html' },
        { title: 'RDB Dorin Dora', keywords: 'dorin dora savings', url: 'rdb_dorin_dora.html' },
        { title: '14 Plus Savings', keywords: '14 plus youth teen savings', url: '14plus.html' },
        { title: 'New Kakulu', keywords: 'new kakulu savings', url: 'NewKakulu.html' },

        // Loans & Advances
        { title: 'Loans & Advances', keywords: 'loans advances credit borrowing', url: 'Loans_&_Advances.html' },
        { title: 'Loan Calculator', keywords: 'loan calculator emi monthly installment', url: 'loan_calculator.html' },
        { title: 'Consumption Loan', keywords: 'consumption loan personal', url: 'consumption_loan.html' },
        { title: 'Personal Loans', keywords: 'personal loans individual', url: 'Personal_Loans.html' },
        { title: 'Housing Loan', keywords: 'housing loan home mortgage', url: 'housing.html' },
        { title: 'Agriculture Loan', keywords: 'agriculture farming loan agri', url: 'agriculture.html' },
        { title: 'Agri Loan', keywords: 'agri loan farming', url: 'agri.html' },
        { title: 'Govi Loan', keywords: 'govi farming agricultural', url: 'govi.html' },
        { title: 'Dairy Loan', keywords: 'dairy loan milk cattle', url: 'dairy.html' },
        { title: 'Fishery Loan', keywords: 'fishery fishing loan boat', url: 'fishery.html' },
        { title: 'Commercial Loan', keywords: 'commercial business loan', url: 'commercial.html' },
        { title: 'Industrial Loan', keywords: 'industrial factory manufacturing loan', url: 'Industrial.html' },
        { title: 'Business Loan', keywords: 'business enterprise loan sme', url: 'business.html' },
        { title: 'Tourism Loan', keywords: 'tourism hotel travel loan', url: 'tourism.html' },
        { title: 'Transport Loan', keywords: 'transport vehicle loan', url: 'transport.html' },
        { title: 'Solar Loan', keywords: 'solar energy green loan panel', url: 'solar.html' },
        { title: 'Pension Loan', keywords: 'pension retirement loan', url: 'pension.html' },
        { title: 'Liya Saviya', keywords: 'liya saviya women empowerment loan', url: 'liya_saviya.html' },
        { title: 'Interest Subsidy Loan Schemes', keywords: 'interest subsidy government loan', url: 'Interest_Subsidy_Loan Schemes.html' },
        { title: 'Refinance Loan Schemes', keywords: 'refinance loan schemes', url: 'Refinance_Loan_Schemes.html' },

        // Services
        { title: 'RDB Services', keywords: 'services wepay digital banking', url: 'RDB_Services.html' },
        { title: 'Leasing', keywords: 'leasing vehicle equipment', url: 'leasing.html' },
        { title: 'Pawning', keywords: 'pawning gold jewellery', url: 'pawning.html' },
        { title: 'Speed Cash', keywords: 'speed cash atm card', url: 'speed_cash.html' },
        { title: 'Quick Draft', keywords: 'quick draft money transfer', url: 'quickdraft.html' },
        { title: 'E-Friend', keywords: 'e-friend digital online', url: 'E-Friend.HTML' },
        { title: 'Kapruka Ayojana', keywords: 'kapruka ayojana investment', url: 'KAPRUKA_AYOJANA.HTML' },
        { title: 'Kapruka Jaya Isuru', keywords: 'kapruka jaya isuru', url: 'KAPRUKA_JAYA_ISURU.HTML' },
        { title: 'Krushi Shakthi', keywords: 'krushi shakthi agriculture', url: 'KRUSHI_SHAKTHI.HTML' },
        { title: 'Mahaweli Saviya', keywords: 'mahaweli saviya development', url: 'MAHAWELI_SAVIYA.HTML' },
        { title: 'Moragahakanda', keywords: 'moragahakanda project', url: 'MORAGAHAKANDA.HTML' },
        { title: 'Athamaru', keywords: 'athamaru microfinance', url: 'Athamaru.html' },

        // Media & Info
        { title: 'News & Updates', keywords: 'news updates articles latest', url: 'news.html' },
        { title: 'Alerts / Service Alerts', keywords: 'alerts service notice warning', url: 'AlertPage.html' },
        { title: 'Awards & Recognition', keywords: 'awards recognition achievements', url: 'Awards_&_Recognition.html' },
        { title: 'Financial Reports', keywords: 'financial reports statement', url: 'Financial_Reports.html' },
        { title: 'Annual Reports', keywords: 'annual reports yearly book cover', url: 'Annual_Reports.html' },
        { title: 'Procurement', keywords: 'procurement tenders bidding', url: 'Procurement.html' },

        // Careers
        { title: 'Careers', keywords: 'careers jobs vacancies recruitment', url: 'Careers.html' },
        { title: 'Career - Banking Operations', keywords: 'career banking operations', url: 'Career_BankingOperations.html' },
        { title: 'Career - Customer Service', keywords: 'career customer service', url: 'Career_CustomerService.html' },
        { title: 'Career - Finance', keywords: 'career finance accounting', url: 'Career_Finance.html' },
        { title: 'Career - HR', keywords: 'career human resources hr', url: 'Career_HR.html' },
        { title: 'Career - IT', keywords: 'career information technology it', url: 'Career_IT.html' },
        { title: 'Career - Management', keywords: 'career management', url: 'Career_Management.html' },

        // Other
        { title: 'Complaint Form', keywords: 'complaint form grievance feedback', url: 'complaint_form.html' },
    ];
    
    // Create suggestions dropdown if it doesn't exist
    let suggestionsList = document.getElementById('searchSuggestions');
    if (!suggestionsList) {
        suggestionsList = document.createElement('div');
        suggestionsList.id = 'searchSuggestions';
        suggestionsList.className = 'search-suggestions';
        searchInput.parentElement.appendChild(suggestionsList);
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Search input event listener
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                suggestionsList.style.display = 'none';
                suggestionsList.innerHTML = '';
                return;
            }
            
            // Filter suggestions based on query (search title and keywords)
            const filteredPages = searchablePages.filter(page => 
                page.title.toLowerCase().includes(query) ||
                (page.keywords && page.keywords.toLowerCase().includes(query))
            ).slice(0, 8);
            
            if (filteredPages.length === 0) {
                suggestionsList.innerHTML = '<div class="suggestion-item no-result"><span>No results found</span></div>';
                suggestionsList.style.display = 'block';
                return;
            }
            
            // Display suggestions
            suggestionsList.innerHTML = filteredPages.map(page => `
                <a href="${page.url}" class="suggestion-item">
                    <span>${highlightMatch(page.title, query)}</span>
                </a>
            `).join('');
            
            suggestionsList.style.display = 'block';
        });

        // Navigate to first result on Enter
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const firstLink = suggestionsList.querySelector('a.suggestion-item');
                if (firstLink) {
                    window.location.href = firstLink.getAttribute('href');
                }
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-search')) {
                searchInput.classList.remove('active');
                suggestionsList.style.display = 'none';
            }
        });
    }
    
    // Helper function to highlight matching text
    function highlightMatch(text, query) {
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    // Active link management
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('dropdown-trigger')) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    if (currentPath) {
        navLinks.forEach(link => link.classList.remove('active'));
        const match = Array.from(navLinks).find(link => {
            if (!link.getAttribute('href')) return false;
            const hrefPath = link.getAttribute('href').split('/').pop().toLowerCase();
            return hrefPath === currentPath;
        });

        if (match) {
            match.classList.add('active');
        }
    }
});

// Stats counters: animate numbers from 0 to target
function getStatCounters() {
    return Array.from(document.querySelectorAll('.stat-number'));
}

function parseStatTarget(text) {
    const trimmed = (text || '').trim();
    const match = trimmed.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { target: 0, suffix: '' };
    return { target: parseFloat(match[1]), suffix: match[2] || '' };
}

function animateStatCounter(el, target, suffix, duration = 1500) {
    const startTime = performance.now();
    const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
    };
    el.textContent = `0${suffix}`;
    requestAnimationFrame(step);
}

function runStatCounters() {
    const counters = getStatCounters();
    counters.forEach((el) => {
        const { target, suffix } = parseStatTarget(el.textContent);
        animateStatCounter(el, target, suffix);
    });
}

function showLoanTab(tabName) {
    // 1. Hide all sections
    const sections = document.querySelectorAll('.loan-content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // 2. Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Show selected section
    const targetSection = document.getElementById(tabName + '-content');
    if(targetSection) {
        targetSection.classList.add('active');
    }

    // 4. Highlight the clicked button
    event.currentTarget.classList.add('active');
}