import React, { useState, useEffect, useRef } from "react";
// Import the necessary hook from the intersection observer library
import { useInView } from "react-intersection-observer";

// ================================================
// 🎨 New Fade-In Component for Scroll Animation
// ================================================

// Reusable component for fade-in on scroll
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  // `ref` will be attached to the DOM element, `inView` will be true when it's visible.
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,    // Start animation when 10% of the element is visible
  });

  // Base transition styles
  const transitionStyle = {
    // Tailwind's transition-opacity duration is 300ms by default (transition-all)
    transition: `opacity 700ms ease-out, transform 700ms ease-out`,
    transitionDelay: `${delay}ms`, // Apply the stagger delay
    opacity: inView ? 1 : 0,       // Visible or hidden
    transform: inView ? "translateY(0)" : "translateY(20px)", // Slide up from 20px below
  };

  return (
    <div
      ref={ref}
      style={transitionStyle}
      className={className} // Propagate any additional Tailwind classes
    >
      {children}
    </div>
  );
};


// ================================================
// AIPSC 2025 - Static Landing Page (Updated Links + Mobile Fixes)
// ================================================

const ticketingOpen = false; // change to true when ticketing starts


export default function App() {
  useEffect(() => {
    if (window.location.pathname === "/register") {
      setTimeout(() => {
        registerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []);

  // 1. MOBILE NAVBAR FIX: State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Array of Navbar Links for reuse
  const navLinks = [
    { href: "#about-aipsc", label: "ABOUT" },
    { href: "#why-attend", label: "WHY ATTEND" },
    { href: "#experience", label: "EXPERIENCE" },
  ];

  return (
    // Outer container keeps the main viewport background white
    <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden overflow-y-auto">
      
      {/* 1. NAVBAR - fixed, top-most layer */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow py-4">
        <div className="max-w-[1500px] w-[92%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/aipsc/navbar-logo.png" className="h-12 object-contain" alt="AIPSC logo" />
          </div>
          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-12 text-lg font-semibold text-slate-700 tracking-wide">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-orange-600 cursor-pointer transition">{link.label}</a>
              </li>
            ))}
          </ul>
          {/* Updated Register Now Button Href */}
          <a href="#register" className="hidden md:flex bg-orange-500 text-white font-bold text-lg px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition">REGISTER NOW</a>
          
          {/* MOBILE MENU TOGGLE BUTTON */}
          <button 
            className="md:hidden text-3xl font-bold text-slate-700"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MOBILE MENU LIST - Conditionally rendered */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-white shadow-lg pb-4 mt-4">
            <ul className="flex flex-col items-center gap-4 text-lg font-semibold text-slate-700 tracking-wide">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full text-center">
                  <a 
                    href={link.href} 
                    className="block py-2 hover:bg-slate-100 transition"
                    onClick={toggleMenu} // Close menu on click
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a 
              href="#register" 
              className="mt-4 block mx-auto w-[92%] bg-orange-500 text-white font-bold text-lg px-6 py-3 rounded-xl shadow text-center hover:bg-orange-600 transition"
              onClick={toggleMenu} // Close menu on click
            >
              REGISTER NOW
            </a>
          </div>
        )}

      </nav>

      {/* 2. HERO SECTION - FIXED BACKGROUND - Z-INDEX 25 (This is the visible element at the start) */}
<section className="w-full h-screen fixed top-0 left-0 z-25 bg-white"> 
  {/* The pt-20 here is good for ensuring content is below a fixed navbar */}
  <div className="absolute inset-0 flex justify-center items-center pt-20 md:pt-20"> 
      {/* FIXED: Removed 'md:h-[680px]' to keep height responsive via 'h-[85vh]' on all screens.
        FIXED: Added 'lg:rounded-[40px]' or 'xl:rounded-[50px]' for more pronounced rounded corners 
               on larger screens, ensuring they remain visible in web view.
      */}
      <div className="relative w-[96%] max-w-[1370px] rounded-[28px] lg:rounded-[28px] overflow-hidden shadow-2xl h-[85vh]"> 
          <img
              src="/aipsc/herosection.png"
              className="absolute inset-0 w-full h-full object-cover"
              alt="hero background"
          />
          
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          {/* Alignment is already decent: top-1/4 for mobile and standard alignment for md */}
          <h1 className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center 
                        md:text-[140px] text-5xl font-extrabold tracking-tight leading-[1] 
                        text-white select-none z-20 whitespace-nowrap">
            BEYOND <span className="text-orange-500">LIMITS.</span>
          </h1>
          <div className="absolute inset-x-0 bottom-28 text-center z-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-[1000px] mx-auto px-4">IEEE All India ProComm Student Congress 2025</h2>
              <p className="mt-3 text-base md:text-lg text-white/85 max-w-[900px] mx-auto px-4">A two-day journey into communication, management, and innovation.</p>
          </div>
          <div className="absolute left-0 right-0 bottom-6 flex justify-center z-20">
              <div className="bg-[#1b72a5] text-white text-sm md:text-lg font-semibold px-8 py-2 rounded-full shadow-lg">
                  Jan 03–04, 2026 | Palakkad, Kerala
              </div>
          </div>
      </div>
  </div>
</section>

      {/* 3. SCROLLABLE CONTENT WRAPPER - This MUST be transparent to reveal the fixed hero */}
      <div className="relative z-30 mb-0">
        
        {/* Spacer to push content down initially, allowing the fixed hero to fill the viewport */}
        {/* Ensure this spacer remains fully transparent */}
        <div className="h-screen bg-transparent pointer-events-none"></div> 
        
        {/* BLUE BAND: About + Powered By + Host + Chapter Info */}
        {/* Added ID for ABOUT link */}
        <section id="about-aipsc" className="w-full bg-[#0673a9] py-12 md:py-24 rounded-t-[60px] relative">
          <div className="max-w-[1500px] w-[92%] mx-auto text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-sm tracking-wide uppercase text-sky-100 font-medium">About AIPSC</div>
                <h3 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">A New Era of <br /> Professional Communication</h3>
                <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-[680px]">
                  The <strong>All India Professional Communication Student Congress (AIPSC)</strong> is envisioned as a national platform that celebrates the art, science, and future of professional communication. This inaugural edition brings together students, educators, and professionals from across the country to explore communication in engineering, business, leadership, and technology.
                  <br /><br />AIPSC aims to foster clarity in expression, confidence in delivery, and creativity in problem solving - empowering the next generation of communicators and leaders.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div
                  className="w-[580px] h-[460px] rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm"
                  style={{ backgroundImage: `url('/aipsc/aboutaipsc.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  aria-hidden
                />
              </div>
            </div>
            {/* Powered By row */}
            <div className="mt-6 md:mt-12 text-center">
              <div className="text-lg tracking-wide text-white/90">Powered By</div>
              
              {/* FIX: Use grid-cols-2 for mobile (2 logos per line), then switch to sm:grid-cols-3 and md:grid-cols-5. */}
              {/* Base (mobile) grid is set to 2 columns and centered. */}
              <div className="grid grid-cols-2 gap-6 mt-6 mb-16 justify-items-center sm:grid-cols-3 md:grid-cols-5">
                {[
                  "/aipsc/logo1.png", 
                  "/aipsc/logo2.png", 
                  "/aipsc/logo3.png", 
                  "/aipsc/logo4.png", 
                  "/aipsc/logo5.png",
                ].map((logo, i) => (
                  <div
                    key={i}
                    // Conditional class for the last item (index 4)
                    className={`bg-white rounded-xl h-16 flex items-center justify-center shadow-sm w-full max-w-[200px] 
                      ${i === 4 ? 'col-span-2 justify-self-center' : ''} 
                      sm:col-span-1 sm:w-full`} // Reset spanning on sm: and up
                  >
                    <img
                      src={logo}
                      className="max-h-10 object-contain"
                      alt={`logo-${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* MEET OUR HOST */}
            <div className="w-full py-10 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                {/* *** Change is here: Added h-[500px] *** */}
                <img src="/aipsc/host.png" className="rounded-2xl shadow-xl w-full h-[400px] object-cover" alt="lead college" />
                <div>
                  <div className="text-xs tracking-wider uppercase text-sky-100">Meet our Host</div>
                  <h3 className="mt-2 text-3xl md:text-4xl font-extrabold">LEAD College (Autonomous)</h3>
                  <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed max-w-[600px]">
                    LEAD College (Autonomous), an autonomous state-of-the-art, stand-alone MBA institute, approved by AICTE and affiliated with the University of Calicut, was established in 2011. LEAD is an acronym derived from 'Leadership & Entrepreneurship Academy, Dhoni'.
                  </p>
                  <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed max-w-[600px]">
                    Located in the serene foothills of Dhoni, this is an ecosystem powered by 85% solar energy and 100% passion. It's not just a campus; it's a catalyst for the next generation of leaders.
                  </p>
                  <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed max-w-[600px]">
                    LEAD envisions creating an academic environment where the highest standards of academics and professionalism are met and, besides, the expectations of all stakeholders are consciously addressed.
                  </p>
                </div>
              </div>
            </div>
            {/* CHAPTER INFO */}
            <div className="w-full py-8 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* IMAGE — first on mobile */}
                <img
                  src="/aipsc/aboutprocomm.png"
                  className="rounded-xl shadow-lg w-full max-h-[480px] max-w-[680px] object-cover order-1 lg:order-2"
                  alt="chapter"
                />

                {/* TEXT — second on mobile */}
                <div className="order-2 lg:order-1">
                  <div className="uppercase text-xs tracking-wider text-sky-200">
                    About IEEE ProComm–TEMS Kerala Jt. Chapter
                  </div>

                  <h3 className="mt-3 text-3xl md:text-4xl font-extrabold">
                    Driving Innovation & Impact
                  </h3>

                  <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-[650px]">
                    The IEEE ProComm–TEMS Kerala Joint Chapter was inaugurated on 20 September 2025 at NIT Calicut,
                    marking the beginning of a collaborative journey blending communication excellence with technological
                    and managerial innovation.
                    <br /><br />
                    The launch brought together distinguished IEEE leaders including Dr. Manoj B S, Dr. Sameer S M,
                    Dr. Sudeendra Koushik, and Dr. Pam Estes Brewer — each sharing insights on leadership, creativity,
                    and the future of technology-driven communication.
                    <br /><br />
                    This chapter stands committed to fostering professional excellence, future-ready leadership,
                    and impactful collaboration across Kerala’s vibrant technical community.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* WHY ATTEND - FIGMA BENTO */}
        <section id="why-attend" className="w-full py-12 bg-white">
          <div className="max-w-[1500px] w-[92%] mx-auto text-center">

            {/* HEADING */}
            <FadeInSection>
              <h3 className="text-4xl md:text-5xl font-extrabold">
                WHY <span className="text-orange-500">ATTEND?</span>
              </h3>
              <p className="mt-4 text-slate-600 text-base md:text-lg max-w-[750px] mx-auto">
                Immerse yourself in two days of outcome-based learning, connection, and professional growth.
              </p>
            </FadeInSection>
            
            {/* BENTO GRID */}
            <div className="grid grid-cols-12 gap-6 mt-14">

              {/* ROW 1 */}
              <FadeInSection 
                delay={0} 
                className="group col-span-12 md:col-span-8 relative h-[260px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="/aipsc/oa.png" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  alt="Outbound Adventures" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                  <h4 className="text-3xl font-extrabold text-white">Outbound Adventures</h4>
                </div>
              </FadeInSection>

              <FadeInSection 
                delay={100} 
                className="group col-span-12 md:col-span-4 relative h-[260px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="/aipsc/nw.png" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  alt="Networking" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                  <h4 className="text-3xl font-extrabold text-white">Networking</h4>
                </div>
              </FadeInSection>

              {/* ROW 2 */}
              <FadeInSection 
                delay={200} 
                className="group col-span-12 md:col-span-4 relative h-[260px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="/aipsc/td.png" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  alt="Team Dynamics" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                  <h4 className="text-3xl font-extrabold text-white">Team Dynamics</h4>
                </div>
              </FadeInSection>

              <FadeInSection 
                delay={300} 
                className="group col-span-12 md:col-span-8 relative h-[260px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="/aipsc/ts.png" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  alt="Talk Sessions" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                  <h4 className="text-3xl font-extrabold text-white">Talk Sessions</h4>
                </div>
              </FadeInSection>

              {/* ROW 3 */}
              <FadeInSection 
                delay={400} 
                className="group col-span-12 relative h-[260px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="/aipsc/cn.png" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  alt="Cultural Night" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h4 className="text-4xl font-extrabold text-white">Cultural Night</h4>
                </div>
              </FadeInSection>

            </div>
          </div>
        </section>


        <section id="experience" className="w-full py-12 bg-white">
  <div className="max-w-[1500px] w-[92%] mx-auto">

    {/* HEADER */}
    <FadeInSection>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-16">
        <h2 className="text-[3.5rem] font-extrabold text-[#353535] uppercase leading-none">
          THE <span className="text-orange-500">EXPERIENCE</span>
        </h2>

        <p className="text-[1.3rem] text-gray-600 max-w-[6000px] leading-tight md:text-right">
          AIPSC is not just an event – it’s a memory-making festival. <br />
          Here’s a glimpse of the vibe you can expect.
        </p>
      </div>
    </FadeInSection>


    {/* ------------------------------- */}
    {/* MOBILE VERSION — SHOW IMAGE ONLY */}
    {/* ------------------------------- */}
    <div className="block md:hidden">
      <img
        src="/aipsc/expmob.png"
        alt="Experience Mobile Layout"
        className="w-full h-auto rounded-xl"
      />
    </div>


    {/* ------------------------------- */}
    {/* DESKTOP GRID — HIDDEN ON MOBILE */}
    {/* ------------------------------- */}
    <div className="hidden md:grid gap-6 grid-cols-5 [grid-auto-rows:280px] md:[grid-template-rows:280px_280px]">

      {/* 1 */}
      <FadeInSection delay={0} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w1.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 2 */}
      <FadeInSection delay={100} className="flex items-start justify-start p-4 font-bold text-[1.5rem] text-[#353535] leading-tight">
        Discover<br/>the Energy.
      </FadeInSection>

      {/* 3 */}
      <FadeInSection delay={200} className="flex items-end justify-end p-4 font-bold text-[1.5rem] text-[#353535] leading-tight text-right">
        Moments<br/>of Impact.
      </FadeInSection>

      {/* 4 */}
      <FadeInSection delay={300} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w2.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 5 */}
      <FadeInSection delay={400} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w3.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 6 */}
      <FadeInSection delay={500} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w4.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 7 */}
      <FadeInSection delay={600} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w5.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 8 */}
      <FadeInSection delay={700} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w6.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>

      {/* 9 */}
      <FadeInSection delay={800} className="flex items-start justify-start p-4 font-bold text-[1.5rem] text-[#353535] leading-tight">
        Ready to be<br/>part of the<br/>picture?
      </FadeInSection>

      {/* 10 */}
      <FadeInSection delay={900} className="rounded-[20px] overflow-hidden">
        <img src="/aipsc/w7.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </FadeInSection>
    </div>

  </div>
</section>


        {/* ACCESS PASSES */}
        {/* Added ID for REGISTER NOW link */}
        <section id="register" className="w-full pt-16 pb-20 bg-white relative">
          {/* --- COMING SOON OVERLAY --- */}
          {!ticketingOpen && (
            <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/40 flex items-center justify-center rounded-[28px] transition-opacity duration-700 opacity-100">
              <div className="text-center">
                <h2 className="text-5xl md:text-7xl font-extrabold text-orange-600 drop-shadow-lg tracking-wide">
                  COMING SOON
                </h2>
                <p className="mt-4 text-lg md:text-2xl text-slate-700 font-medium">
                  Ticketing opens shortly
                </p>
              </div>
            </div>
          )}
          {/* HEADING and DESCRIPTION - Wrapped in FadeInSection with a single delay */}
          <FadeInSection>
            <div className="max-w-[1500px] w-[92%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              <p className="text-[#3c3c3c] text-lg leading-relaxed max-w-[520px]">
                Choose the tier that fits you best. All passes include access to technical sessions,
                workshops, and the grand finale.
              </p>
              <div className="text-left lg:text-right">
                <div className="text-sm tracking-[0.2em] text-slate-500 uppercase mb-2">
                  Secure Your Spot
                </div>
                <h3 className="text-4xl md:text-6xl font-extrabold text-[#2d2d2d]">
                  ACCESS <span className="text-orange-500">PASSES</span>
                </h3>
              </div>
            </div>
          </FadeInSection>

          {/* PASS CARDS */}
          <div className="max-w-[1500px] w-[92%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {/* PROCOMM - Delay 0 */}
            <FadeInSection delay={0} className="bg-[#0b77b7] rounded-[28px] p-10 min-h-[520px] flex flex-col justify-between text-white">
              <div>
                <h4 className="text-3xl font-bold mb-10">ProComm Member</h4>
                <div className="space-y-1 mb-10">
                  <div className="text-lg tracking-wide">INR</div>
                  <div className="text-6xl font-extrabold leading-none">1700</div>
                  <div className="text-lg">per person</div>
                </div>
                <ul className="space-y-4 text-lg">
                  <li>• Full 2–Day Access</li>
                  <li>• ProComm Swags</li>
                  <li>• Gala Dinner Entry</li>
                  <li>• Networking Summit</li>
                </ul>
              </div>
              <a
                href="https://snaptiqz.com/event/aipsc"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 bg-orange-500 text-white text-center font-bold py-4 rounded-xl hover:opacity-90 transition"
              >
                REGISTER NOW
              </a>
            </FadeInSection>
            
            {/* IEEE - Delay 150 */}
            <FadeInSection delay={150} className="bg-[#0b77b7] rounded-[28px] p-10 min-h-[520px] flex flex-col justify-between text-white">
              <div>
                <h4 className="text-3xl font-bold mb-10">IEEE Member</h4>
                <div className="space-y-1 mb-10">
                  <div className="text-lg tracking-wide">INR</div>
                  <div className="text-6xl font-extrabold leading-none">1850</div>
                  <div className="text-lg">per person</div>
                </div>
                <ul className="space-y-4 text-lg">
                  <li>• Full 2–Day Access</li>
                  <li>• Delegate Kits</li>
                  <li>• Gala Dinner Entry</li>
                  <li>• Networking Summit</li>
                </ul>
              </div>
              <a
                href="https://snaptiqz.com/event/aipsc"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 bg-white text-[#0b77b7] text-center font-bold py-4 rounded-xl hover:opacity-90 transition"
              >
                REGISTER NOW
              </a>
            </FadeInSection>
            
            {/* NON-IEEE - Delay 300 */}
            <FadeInSection delay={300}   className="bg-[#CBD5E1] text-[#1E293B] rounded-[28px] p-10 min-h-[520px] flex flex-col justify-between">
              <div>
                <h4 className="text-3xl font-bold mb-10">Non-IEEE Member</h4>
                <div className="space-y-1 mb-10">
                  <div className="text-lg tracking-wide">INR</div>
                  <div className="text-6xl font-extrabold leading-none">2000</div>
                  <div className="text-lg">per person</div>
                </div>
                <ul className="space-y-4 text-lg">
                  <li>• Full 2–Day Access</li>
                  <li>• Delegate Kit</li>
                  <li>• Gala Dinner Entry</li>
                  <li>• Networking Summit</li>
                </ul>
              </div>
              <a
                href="https://snaptiqz.com/event/aipsc"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 bg-[#1E293B] text-white text-center font-bold py-4 rounded-xl hover:opacity-90 transition"
              >
                REGISTER NOW
              </a>
            </FadeInSection>
          </div>
        </section>

        {/* FOOTER - BLUE SECTION */}
        <footer className="w-full bg-[#0673a9] text-white px-8 pt-20 pb-12 relative z-30">
          <div className="max-w-[1500px] w-[92%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-2xl font-bold">Ready to innovate?</h4>
                {/* Footer Register Now button href to access passes */}
                <a href="#register" className="inline-block mt-4 bg-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition">Register Now</a>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
                <ul className="space-y-2 text-white/90 text-sm">
                  {/* Updated Useful Links to reflect Navbar items and Hrefs */}
                  <li><a href="#about-aipsc" className="hover:text-orange-400 transition">ABOUT</a></li>
                  <li><a href="#why-attend" className="hover:text-orange-400 transition">WHY ATTEND</a></li>
                  <li><a href="#experience" className="hover:text-orange-400 transition">EXPERIENCE</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-4">IEEE</h5>
                <ul className="space-y-2 text-white/90 text-sm">
                  {/* Updated IEEE links */}
                  <li><a href="https://procomm.ieee.org/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">IEEE ProComm</a></li>
                  <li><a href="https://ieeeindiacouncil.org/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">IEEE India Council</a></li>
                  <li><a href="https://ieeekerala.org/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">IEEE Kerala Section</a></li>
                </ul>
              </div>
            </div>
            {/* Social Media and Copyright Row */}
            <div className="mt-12 pt-6 border-t border-white/30 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex space-x-4 text-2xl">
                {/* LinkedIn icon link */}
                <a href="https://www.linkedin.com/company/ieee-procomm-tems-kerala" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white rounded-md cursor-pointer hover:bg-white/10 text-xl font-bold transition" aria-label="LinkedIn">
                  <span className="font-bold">in</span>
                </a>
                {/* Instagram icon link */}
                <a href="https://www.instagram.com/ieee.procomm_tems.kerala/#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white rounded-md cursor-pointer hover:bg-white/10 text-xl font-bold transition" aria-label="Instagram">
                  <span className="font-bold">@</span>
                </a>
                {/* Mail icon link */}
                <a href="mailto:ieeeprocommtemskerala@gmail.com" className="w-8 h-8 flex items-center justify-center border border-white rounded-md cursor-pointer hover:bg-white/10 text-xl font-bold transition" aria-label="Email">
                  <span className="font-bold">✉</span>
                </a>
              </div>
              <div className="text-white/70 text-sm">
                © 2026 IEEE ProComm-TEMS Kerala Jt. Chapter.
              </div>
            </div>
          </div>
        </footer>

        {/* ORANGE FOOTER SECTION (Static) */}
        <div className="w-full bg-orange-500 flex items-center justify-center overflow-hidden">
          <img
            src="/aipsc/footer.png"
            className="w-full object-cover"
            alt="big logo backdrop"
          />
        </div>
        
      </div> {/* END OF SCROLLABLE CONTENT WRAPPER */}

    </div>
  );
}