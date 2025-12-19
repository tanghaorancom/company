// 页面加载完成后执行
$(document).ready(function() {
    // 加载所有JSON数据
    loadAllData();
    
    // 初始化动画效果
    initAnimations();
    
    // 初始化交互功能
    initInteractions();
    
    // 设置当前年份
    $('#currentYear').text(new Date().getFullYear());
});

// 加载所有JSON数据
function loadAllData() {
    loadCompanyData();
    loadServicesData();
    loadTeamData();
    loadContactData();
    loadNoticesData();
    loadNewsData();
}

// 加载公司基本信息
function loadCompanyData() {
    $.getJSON('info/company.json')
        .done(function(data) {
            $('#companyName').text(data.name);
            $('#footerCompanyName').text(data.name);
            $('#companyDescription').text(data.description);
            $('#bannerTitle').text(data.bannerTitle);
            $('#bannerSubtitle').text(data.bannerSubtitle);
            $('#companyMission').text(data.mission);
            $('#companyVision').text(data.vision);
            
            // 数字增长动画
            animateNumber('#employeeCount', 0, data.employees, 2000);
            animateNumber('#projectCount', 0, data.projects, 2000);
            animateNumber('#clientCount', 0, data.clients, 2000);
            animateNumber('#yearEstablished', 0, data.established, 2000);
            
            // 加载核心价值观
            loadValues(data.values);
            
            // 加载发展历程
            loadTimeline(data.history);
            
            // 加载成就
            loadAchievements(data.achievements);
        })
        .fail(function() {
            console.error('加载公司数据失败，使用默认内容');
            // 为关键元素设置默认值
            $('#companyMission').text('通过创新科技，解决人类面临的重大挑战，推动社会进步与可持续发展。');
            $('#companyVision').text('成为全球领先的科技解决方案提供商，引领行业变革，创造美好未来。');
            
            // 加载默认的核心价值观
            loadValues([
                { name: '创新', description: '持续创新是我们发展的核心动力。' },
                { name: '卓越', description: '追求卓越，提供高品质的产品和服务。' },
                { name: '合作', description: '与客户、合作伙伴和员工建立长期稳定的合作关系。' },
                { name: '责任', description: '承担社会责任，推动可持续发展。' }
            ]);
            
            // 加载默认的发展历程
            loadTimeline([
                { year: 2015, event: '公司成立，专注于人工智能技术研发。' },
                { year: 2017, event: '获得A轮融资，扩大研发团队和业务范围。' },
                { year: 2019, event: '推出自主研发的AI平台，服务超过100家企业客户。' },
                { year: 2021, event: '在大数据和云计算领域取得突破，成为行业领导者。' },
                { year: 2023, event: '全球员工人数突破150人，业务拓展至海外市场。' }
            ]);
            
            // 加载默认的成就
            loadAchievements([
                '国家高新技术企业认证',
                '多项国家级科技奖项',
                '200+企业客户的信任与支持',
                '100+项技术专利和软件著作权'
            ]);
        });
}

// 加载核心价值观
function loadValues(values) {
    const valuesGrid = $('#valuesGrid');
    valuesGrid.empty();
    
    values.forEach(value => {
        const valueItem = $('<div class="value-item">');
        valueItem.html(`
            <h4>${value.name}</h4>
            <p>${value.description}</p>
        `);
        valuesGrid.append(valueItem);
    });
}

// 加载发展历程
function loadTimeline(history) {
    const timeline = $('#timeline');
    timeline.empty();
    
    history.forEach((item, index) => {
        const timelineItem = $('<div class="timeline-item">');
        timelineItem.addClass(index % 2 === 0 ? 'left' : 'right');
        timelineItem.html(`
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-event">${item.event}</div>
            </div>
        `);
        timeline.append(timelineItem);
    });
}

// 加载成就
function loadAchievements(achievements) {
    const achievementsList = $('#achievementsList');
    achievementsList.empty();
    
    achievements.forEach(achievement => {
        const achievementItem = $('<div class="achievement-item">');
        achievementItem.text(achievement);
        achievementsList.append(achievementItem);
    });
}

// 加载服务信息
function loadServicesData() {
    $.getJSON('info/services.json')
        .done(function(data) {
            const servicesGrid = $('#servicesGrid');
            servicesGrid.empty();
            
            data.forEach(service => {
                const serviceItem = $('<div class="service-item">');
                serviceItem.html(`
                    <i class="service-icon">${service.icon}</i>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `);
                servicesGrid.append(serviceItem);
            });
        })
        .fail(function() {
            console.error('加载服务数据失败，使用默认内容');
            const servicesGrid = $('#servicesGrid');
            servicesGrid.empty();
            
            // 默认服务数据
            const defaultServices = [
                { icon: '🚀', title: '人工智能', description: '提供先进的人工智能解决方案，包括机器学习、深度学习和自然语言处理等。' },
                { icon: '☁️', title: '云计算', description: '基于云端的计算服务，提供高效、安全、可扩展的IT基础设施。' },
                { icon: '🔒', title: '网络安全', description: '全方位的网络安全解决方案，保护您的数据和系统免受威胁。' },
                { icon: '📱', title: '移动应用', description: '跨平台移动应用开发，为用户提供优质的移动体验。' },
                { icon: '💻', title: '软件开发', description: '定制化软件开发服务，满足客户的特定业务需求。' },
                { icon: '📊', title: '数据分析', description: '专业的数据分析服务，帮助客户从数据中获取有价值的信息。' }
            ];
            
            defaultServices.forEach(service => {
                const serviceItem = $('<div class="service-item">');
                serviceItem.html(`
                    <i class="service-icon">${service.icon}</i>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `);
                servicesGrid.append(serviceItem);
            });
        });
}

// 加载团队成员信息
function loadTeamData() {
    $.getJSON('info/team.json')
        .done(function(data) {
            const teamGrid = $('#teamGrid');
            teamGrid.empty();
            
            data.forEach(member => {
                const teamMember = $('<div class="team-member">');
                teamMember.html(`
                    <img src="${member.avatar}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                    <p class="member-description">${member.description}</p>
                `);
                teamGrid.append(teamMember);
            });
        })
        .fail(function() {
            console.error('加载团队数据失败，使用默认内容');
            const teamGrid = $('#teamGrid');
            teamGrid.empty();
            
            // 默认团队数据
            const defaultTeam = [
                { name: '张明', position: 'CEO', description: '10年以上科技行业经验，曾在多家知名企业担任高管职务。', avatar: 'https://via.placeholder.com/150' },
                { name: '李娜', position: 'CTO', description: '人工智能专家，拥有多项技术专利，带领技术团队实现了多个创新项目。', avatar: 'https://via.placeholder.com/150' },
                { name: '王强', position: '技术总监', description: '云计算领域资深专家，负责公司技术架构设计和研发管理。', avatar: 'https://via.placeholder.com/150' },
                { name: '刘洋', position: '产品经理', description: '拥有丰富的产品规划和市场推广经验，致力于为客户提供最优质的产品。', avatar: 'https://via.placeholder.com/150' }
            ];
            
            defaultTeam.forEach(member => {
                const teamMember = $('<div class="team-member">');
                teamMember.html(`
                    <img src="${member.avatar}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                    <p class="member-description">${member.description}</p>
                `);
                teamGrid.append(teamMember);
            });
        });
}

// 加载联系信息
function loadContactData() {
    $.getJSON('info/contact.json')
        .done(function(data) {
            $('#companyAddress').text(data.address);
            $('#companyPhone').text(data.phone);
            $('#companyEmail').text(data.email);
        })
        .fail(function() {
            console.error('加载联系数据失败，使用默认内容');
            $('#companyAddress').text('北京市海淀区科技园区');
            $('#companyPhone').text('400-123-4567');
            $('#companyEmail').text('info@techinnovate.com');
        });
}

// 加载公示数据
function loadNoticesData() {
    $.getJSON('info/notices.json')
        .done(function(data) {
            const noticesGrid = $('#noticesGrid');
            noticesGrid.empty();
            
            data.notices.forEach(notice => {
                const noticeItem = $('<div class="notice-item">');
                noticeItem.html(`
                    <h3 class="notice-title">${notice.title}</h3>
                    <p class="notice-date">${notice.date}</p>
                    <p class="notice-content">${notice.content}</p>
                `);
                noticesGrid.append(noticeItem);
            });
        })
        .fail(function() {
            console.error('加载公示数据失败，使用默认内容');
            const noticesGrid = $('#noticesGrid');
            noticesGrid.empty();
            
            // 默认公示数据
            const defaultNotices = [
                { id: 1, title: '公司年度会议通知', content: '公司将于下周五举行年度会议，请全体员工准时参加。', date: '2025-04-20' },
                { id: 2, title: '放假安排公告', content: '五一假期放假安排：5月1日至5月5日放假调休，共5天。', date: '2025-04-15' },
                { id: 3, title: '系统维护通知', content: '公司系统将于今晚22:00-24:00进行维护，请提前做好准备。', date: '2025-04-10' },
                { id: 4, title: '新员工入职培训', content: '新员工入职培训将于下周一上午9点开始，请新员工准时参加。', date: '2025-04-05' }
            ];
            
            defaultNotices.forEach(notice => {
                const noticeItem = $('<div class="notice-item">');
                noticeItem.html(`
                    <h3 class="notice-title">${notice.title}</h3>
                    <p class="notice-date">${notice.date}</p>
                    <p class="notice-content">${notice.content}</p>
                `);
                noticesGrid.append(noticeItem);
            });
        });
}

// 加载新闻数据
function loadNewsData() {
    $.getJSON('info/news.json')
        .done(function(data) {
            const newsGrid = $('#newsGrid');
            newsGrid.empty();
            
            data.news.forEach(news => {
                const newsItem = $('<div class="news-item">');
                newsItem.html(`
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-date">${news.date}</p>
                        <p class="news-description">${news.content.substring(0, 150)}...</p>
                        <a href="#" class="read-more">阅读全文</a>
                    </div>
                `);
                newsGrid.append(newsItem);
            });
        })
        .fail(function() {
            console.error('加载新闻数据失败，使用默认内容');
            const newsGrid = $('#newsGrid');
            newsGrid.empty();
            
            // 默认新闻数据
            const defaultNews = [
                { id: 1, title: '公司新办公区启用', content: '公司新办公区今日正式启用，新办公区位于北京市海淀区科技园区，环境优美，设施齐全。', date: '2025-04-18', image: 'https://via.placeholder.com/300x200' },
                { id: 2, title: '新产品发布', content: '公司今日发布全新产品系列，该系列产品采用了最新的技术，具有更强的性能和更好的用户体验。', date: '2025-04-12', image: 'https://via.placeholder.com/300x200' },
                { id: 3, title: '行业峰会圆满落幕', content: '由公司主办的行业峰会圆满落幕，本次峰会吸引了众多行业专家和企业代表参加，共同探讨行业发展趋势。', date: '2025-04-08', image: 'https://via.placeholder.com/300x200' },
                { id: 4, title: '员工团建活动', content: '公司组织了员工团建活动，通过各种有趣的游戏和挑战，增强了员工之间的沟通和团队合作精神。', date: '2025-04-01', image: 'https://via.placeholder.com/300x200' }
            ];
            
            defaultNews.forEach(news => {
                const newsItem = $('<div class="news-item">');
                newsItem.html(`
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-date">${news.date}</p>
                        <p class="news-description">${news.content.substring(0, 150)}...</p>
                        <a href="#" class="read-more">阅读全文</a>
                    </div>
                `);
                newsGrid.append(newsItem);
            });
        });
}

// 初始化动画效果
function initAnimations() {
    // 滚动动画
    $(window).scroll(function() {
        checkScrollAnimations();
    });
    
    // 初始检查
    checkScrollAnimations();
}

// 滚动动画检查
function checkScrollAnimations() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    
    $('.scroll-animate').each(function() {
        const elementTop = $(this).offset().top;
        const elementHeight = $(this).height();
        
        if (scrollTop + windowHeight > elementTop + elementHeight * 0.3) {
            $(this).addClass('visible');
        }
    });
}

// 数字增长动画
function animateNumber(element, start, end, duration) {
    const obj = $(element);
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.text(value);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// 初始化交互功能
function initInteractions() {
    // 平滑滚动
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
        }
    });
    
    // 表单提交
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // 简单的表单验证
        const name = $(this).find('input[type="text"]').val();
        const email = $(this).find('input[type="email"]').val();
        const message = $(this).find('textarea').val();
        
        if (name && email && message) {
            // 模拟提交
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.text();
            
            submitBtn.text('发送中...');
            submitBtn.prop('disabled', true);
            
            setTimeout(function() {
                submitBtn.text('发送成功！');
                
                // 重置表单
                $('.contact-form')[0].reset();
                
                setTimeout(function() {
                    submitBtn.text(originalText);
                    submitBtn.prop('disabled', false);
                }, 2000);
            }, 1500);
        }
    });
    
    // 导航栏滚动效果
    function updateNavbar() {
        const navbar = $('.navbar');
        if ($(window).scrollTop() > 50) {
            navbar.css('background', 'rgba(10, 14, 39, 0.98)');
            navbar.css('box-shadow', '0 5px 20px rgba(0, 0, 0, 0.3)');
        } else {
            navbar.css('background', 'rgba(10, 14, 39, 0.95)');
            navbar.css('box-shadow', 'none');
        }
    }
    
    // 添加悬停动画效果
    $('.service-item, .team-member, .stat-item').hover(
        function() {
            $(this).css('transform', 'translateY(-10px) scale(1.02)');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );
}

// 页面加载动画
$(window).on('load', function() {
    // 添加页面加载完成的动画效果
    $('.banner-content').css('animation', 'fadeInUp 1s ease forwards 0.5s');
    
    // 为所有需要滚动动画的元素添加类
    $('.about, .services, .team, .contact, .notices, .news').addClass('scroll-animate');
    
    // 为关于我们页面的子部分添加滚动动画类
    $('.about-mission-vision, .about-values, .about-history, .about-achievements').addClass('scroll-animate');
    
    // 为核心价值观、时间线和成就项添加延迟动画效果
    $('.value-item, .timeline-item, .achievement-item, .notice-item, .news-item').each(function(index) {
        $(this).css('animation-delay', (index + 1) * 0.1 + 's');
    });
});

// 视差滚动效果
$(window).scroll(function() {
    const scrollPos = $(window).scrollTop();
    
    // 首页横幅视差效果
    $('.banner').css('transform', 'translateY(' + scrollPos * 0.5 + 'px)');
    
    // 背景网格移动效果
    const gridSpeed = scrollPos * 0.1;
    $('.banner::before').css('transform', 'translate(' + gridSpeed + 'px, ' + gridSpeed + 'px)');
});

// 添加键盘导航支持
$(document).keydown(function(e) {
    // 空格键滚动到下一个区域
    if (e.keyCode === 32) {
        e.preventDefault();
        const currentSection = $('.scroll-animate.visible:last');
        const nextSection = currentSection.next('.scroll-animate');
        
        if (nextSection.length) {
            $('html, body').animate({
                scrollTop: nextSection.offset().top - 70
            }, 1000);
        }
    }
    
    // 向上/向下箭头键滚动
    if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
        const direction = e.keyCode === 38 ? -1 : 1;
        const currentScroll = $(window).scrollTop();
        
        $('html, body').animate({
            scrollTop: currentScroll + direction * $(window).height() * 0.8
        }, 800);
    }
});

// 添加窗口大小改变时的响应式处理
$(window).resize(function() {
    checkScrollAnimations();
});

// 优化移动设备体验
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // 禁用某些动画以提高性能
    $('.service-item, .team-member').css('transition', 'transform 0.3s ease');
    
    // 调整触摸事件
    $('a[href^="#"]').on('touchstart', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
}