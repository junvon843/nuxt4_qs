<script setup lang="ts">
definePageMeta({ layout: 'plain' })
import { onMounted } from 'vue'

useSeoMeta({
  title: '关于我们 - 北京青颂律师事务所',
  description: '北京青颂律师事务所成立于2004年，是一家公司化运营的精品律师事务所，专注涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogTitle: '关于我们 - 北京青颂律师事务所',
  ogDescription: '北京青颂律师事务所成立于2004年，是一家公司化运营的精品律师事务所，专注涉外法律咨询、争议解决、执行领域及体育法律服务。',
  ogImage: 'https://qs-legal.com/about/about_us/heading.png',
  ogUrl: 'https://qs-legal.com/aboutus',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})

function scrollToAnchor(selector: string) {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<template>
  <div class="about-us">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">About Us</div>
        <h1>关于青颂</h1>
        <div class="hero-divider"></div>
        <p class="hero-subtitle">成立于2004年 · 合伙制精品律师事务所 · 公司化运营</p>
      </div>
    </section>

    <!-- Sticky Sub-Nav -->
    <nav class="nav-bar">
      <div class="nav-inner">
        <ul class="nav-links">
          <li><a href="#intro" @click.prevent="scrollToAnchor('#intro')">律所概况</a></li>
          <li><a href="#services" @click.prevent="scrollToAnchor('#services')">专业领域</a></li>
          <li><a href="#network" @click.prevent="scrollToAnchor('#network')">全球合作</a></li>
          <li><a href="#philosophy" @click.prevent="scrollToAnchor('#philosophy')">服务理念</a></li>
          <li><a href="#esg" @click.prevent="scrollToAnchor('#esg')">ESG责任</a></li>
        </ul>
      </div>
    </nav>

    <!-- Intro -->
    <section id="intro" class="intro-section">
      <div class="qs-container">
        <div class="section-header fade-in">
          <h2>律所概况</h2>
          <div class="divider"></div>
        </div>
        <div class="intro-layout">
          <div class="intro-text fade-in">
            <p>
              北京青颂律师事务所成立于2004年，是北京市司法局批准设立的合伙制律师事务所。青颂是一家公司化运营的精品律师事务所，目前拥有专业律师20名，拥有相关领域丰富的法律服务经验，提供全方位的法律服务。尤其在涉外法律咨询、争议解决、执行领域及体育法律服务，青颂能够提供卓越成效的服务。同时青颂与包括意大利、德国、西班牙、波兰、澳大利亚、新加坡、日本、泰国、韩国和美国等多个国家的律师事务所有着紧密的合作关系，能满足客户在境内外的多元化法律需求。
            </p>
            <p>
              青颂律师团队保持着团结友爱、钻研奋进的团队文化；并且，青颂律师始终秉持着"客户至上、专业高效、勤勉尽责、开拓创新、合作共赢"的服务理念。服务过程中，青颂始终以客户需求为核心，充分发挥青颂专业团队的优势，利用国内及海外合作资源，在为客户提供高效高质的法律服务的同时，还为客户提供有效商业信息，积极促进客户间的商业合作。青颂律师事务所坚持走规范化、专业化、国际化的发展道路，竭诚为客户提供高效优质的法律服务。
            </p>
          </div>
          <div class="intro-image fade-in">
            <img src="/about/about_us/florence.jpg" alt="佛罗伦萨城市全景" />
          </div>
        </div>

        <div class="intro-stats fade-in">
          <div class="stat-card">
            <span class="stat-number">2004</span>
            <div class="stat-label">成立年份</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">20+</span>
            <div class="stat-label">专业律师</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">10+</span>
            <div class="stat-label">国际合作国家</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">20</span>
            <div class="stat-label">年执业经验</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="services-section">
      <div class="qs-container">
        <div class="section-header fade-in">
          <h2>核心专业领域</h2>
          <div class="divider"></div>
          <p class="section-subtitle">深耕细作，为客户提供卓越成效的法律服务</p>
        </div>
        <div class="services-grid">
          <div class="service-card fade-in">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v15"/>
                <path d="M5 21h14"/>
                <path d="M5 5l-2 5h4z"/>
                <path d="M19 5l-2 5h4z"/>
                <path d="M5 5h14"/>
              </svg>
            </div>
            <h3>涉外法律咨询</h3>
            <p>为跨境交易、国际投资、海外并购等提供全方位法律支持，助力客户在全球化进程中稳健前行。</p>
          </div>
          <div class="service-card fade-in">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>争议解决</h3>
            <p>在复杂商事纠纷、民事诉讼及仲裁领域拥有丰富经验，以专业策略为客户争取最优解决方案。</p>
          </div>
          <div class="service-card fade-in">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>执行领域</h3>
            <p>专注于生效法律文书的强制执行，运用创新执行策略，切实保障客户合法权益的最终实现。</p>
          </div>
          <div class="service-card fade-in service-card--sports">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
              </svg>
            </div>
            <h3>体育法律服务</h3>
            <p>为体育机构、运动员及赛事主办方提供专业的体育法咨询，涵盖合同、知识产权及争议解决等。</p>
            <img class="sports-accent" src="/about/about_us/olympic-rings.png" alt="奥运五环" />
          </div>
        </div>
      </div>
    </section>

    <!-- Network -->
    <section id="network" class="network-section">
      <div class="network-bg">
        <img src="/about/about_us/colosseum.jpg" alt="罗马斗兽场" />
      </div>
      <div class="network-overlay"></div>
      <div class="qs-container network-content">
        <div class="section-header fade-in">
          <h2>全球合作网络</h2>
          <div class="divider"></div>
          <p class="section-subtitle">紧密的国际合作关系，满足客户境内外多元化法律需求</p>
        </div>
        <div class="countries-grid fade-in">
          <span class="country-tag">意大利</span>
          <span class="country-tag">德国</span>
          <span class="country-tag">西班牙</span>
          <span class="country-tag">波兰</span>
          <span class="country-tag">澳大利亚</span>
          
          <span class="country-tag">新加坡</span>
          <span class="country-tag">日本</span>
          <span class="country-tag">泰国</span>
          <span class="country-tag">韩国</span>
          <span class="country-tag">美国</span>
        </div>
        <div class="network-desc fade-in">
          <p>
            青颂与上述国家的律师事务所有着紧密的合作关系，能为客户提供跨境法律服务的无缝衔接。无论您的业务拓展至何处，青颂都能依托全球合作网络，为您提供一致、高效、专业的法律支持。
          </p>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section id="philosophy" class="philosophy-section">
      <div class="qs-container">
        <div class="section-header fade-in">
          <h2>服务理念与团队文化</h2>
          <div class="divider"></div>
        </div>
        <div class="philosophy-content">
          <div class="philosophy-quote fade-in">
            客户至上、专业高效、勤勉尽责、开拓创新、合作共赢
          </div>
          <p class="philosophy-text fade-in">
            青颂律师团队保持着团结友爱、钻研奋进的团队文化。服务过程中，青颂始终以客户需求为核心，充分发挥青颂专业团队的优势，利用国内及海外合作资源，在为客户提供高效高质的法律服务的同时，还为客户提供有效商业信息，积极促进客户间的商业合作。
          </p>
          <div class="values-grid fade-in">
            <div class="value-item">
              <div class="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h4>客户至上</h4>
              <p>以客户需求为核心驱动力</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h4>专业高效</h4>
              <p>卓越业务水平与高效执行力</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h4>勤勉尽责</h4>
              <p>不轻言放弃，始终怀揣信念</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                  <path d="M12 2v2"/>
                </svg>
              </div>
              <h4>开拓创新</h4>
              <p>持续探索法律服务新路径</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.2-3.2a1 1 0 0 0 0-1.4l-1.4-1.4"/>
                  <path d="M13 13l2.5 2.5a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4L16 10"/>
                  <path d="M16 10l-2.8-2.8a4 4 0 0 0-5.6 0L5 10a4 4 0 0 0 0 5.6l.7.7"/>
                  <path d="M14 22l-2-2"/>
                  <path d="M4 12l8-8"/>
                </svg>
              </div>
              <h4>合作共赢</h4>
              <p>促进客户间商业合作</p>
            </div>
          </div>
          <div class="philosophy-bottom-quote fade-in">
            <p>
              青颂律师不轻言放弃，始终怀揣着能解决问题的信念，努力！我们相信，凭借着卓越的业务水平和真诚奋进的服务态度，青颂可以是您最信赖的合作伙伴之一。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ESG -->
    <section id="esg" class="esg-section">
      <div class="qs-container">
        <div class="esg-header fade-in">
          <div class="esg-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10.22-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            <span>践行ESG理念 · 促进可持续发展</span>
          </div>
          <h2>社会责任与可持续发展</h2>
          <p class="subtitle">青颂感恩社会对自身的培育，也十分珍视对社会的回馈</p>
        </div>
        <div class="esg-grid">
          <div class="esg-card fade-in">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10.22-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              环境责任（E）
            </h3>
            <p>
              从绿色办公到节能减排，青颂在日常运营中积极践行环保理念，将可持续发展融入律所管理的每一个环节，致力于减少碳足迹，为环境保护贡献力量。
            </p>
          </div>
          <div class="esg-card fade-in">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              社会责任（S）
            </h3>
            <p>
              从关注个体到投身公益，青颂在追求法律服务上不断突破的同时，始终将社会责任视为己任，就如同我们全力以赴地为客户提供卓越法律服务一样。
            </p>
          </div>
          <div class="esg-card fade-in">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 22V10l6-6 6 6v12"/>
                <path d="M6 10h12"/>
                <path d="M10 22v-6h4v6"/>
              </svg>
              公司治理（G）
            </h3>
            <p>
              青颂关心并重视每位员工的职业发展与身心健康，并从员工的不同学历背景、社会经验、知识与技能的多样性中汲取力量。在青颂，每位员工都拥有平等的发展机会与话语权，在律所的平台上共同向上生长。
            </p>
          </div>
        </div>
        <div class="esg-footer fade-in">
          <p>
            青颂在履行社会责任、追求可持续发展的道路上坚定前行。我们坚持走规范化、专业化、国际化的发展道路，竭诚为客户提供高效优质的法律服务，同时积极回馈社会，促进个人与社会环境的健康可持续发展。
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="qs-container">
        <h2>成为您最信赖的合作伙伴</h2>
        <p>凭借着卓越的业务水平和真诚奋进的服务态度，青颂期待与您携手共进，共创未来。</p>
        <button type="button" class="cta-btn" onclick="alert('联系功能即将上线')">联系我们</button>
      </div>
    </section>
  </div>
</template>

<style scoped src="./style.css"></style>
