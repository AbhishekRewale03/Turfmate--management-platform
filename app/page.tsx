import type {Metadata} from 'next'
import Link from 'next/link'
import {ArrowRight,CalendarCheck,CalendarDays,Check,Clock3,CreditCard,Menu,ShieldCheck,SlidersHorizontal,Smartphone,UserRound} from 'lucide-react'
import styles from './home.module.css'

export const metadata:Metadata={title:{absolute:'TurfMate — Turf Booking and Management'},description:'TurfMate helps independent turf owners accept bookings, manage availability and collect payments through a unique customer booking link.'}

const features=[
 {icon:CalendarCheck,title:'Live availability',text:'Players only see times that are actually open, so your schedule stays clear and reliable.'},
 {icon:CreditCard,title:'Flexible payments',text:'Collect online advances, accept manual UPI claims, or record payment at the venue.'},
 {icon:ShieldCheck,title:'Conflict protection',text:'Temporary holds and server-side checks help prevent two players from taking the same slot.'},
 {icon:SlidersHorizontal,title:'Pricing control',text:'Set hourly rates, peak pricing and advance-payment rules for the way your turf operates.'},
 {icon:Smartphone,title:'Built for mobile',text:'A quick, focused booking flow that works beautifully on the phone already in every player’s hand.'},
 {icon:Clock3,title:'Less admin',text:'Bookings, customer details, payment status and cancellations stay together in one workspace.'},
]

function Brand(){return <Link href="/" className={styles.brand} aria-label="TurfMate home"><span className={styles.brandMark} aria-hidden="true"><Check size={20} strokeWidth={3}/></span><span>TurfMate</span></Link>}

function BookingPreview(){return <div className={styles.bookingPreview} aria-label="Example TurfMate booking screen">
 <div className={styles.phoneTop}><Brand/><span className={styles.secure}><ShieldCheck size={14}/> Secure booking</span></div>
 <div className={styles.previewHero}><span>BOOK YOUR TURF</span><h2>Choose your game time.</h2><p><span className={styles.locationDot}/> Your neighbourhood turf</p></div>
 <div className={styles.previewBody}>
  <div className={styles.previewHeading}><div><span>PICK A DAY</span><strong>Choose a slot</strong></div><button type="button" aria-label="Open calendar" tabIndex={-1}><CalendarDays size={18}/></button></div>
  <div className={styles.days}><span><small>THU</small><b>10</b></span><span className={styles.activeDay}><small>FRI</small><b>11</b></span><span><small>SAT</small><b>12</b></span><span><small>SUN</small><b>13</b></span></div>
  <p className={styles.startLabel}>Starting time <small>30 min slots</small></p>
  <div className={styles.times}><span>6:00 PM</span><span className={styles.activeTime}>7:00 PM</span><span>8:30 PM</span></div>
  <div className={styles.selection}><div><small>SELECTED</small><strong>7:00 PM → 8:00 PM</strong></div><b>₹1,200</b></div>
  <div className={styles.previewButton}>Continue <ArrowRight size={16}/></div>
 </div>
</div>}

function OwnerPreview(){return <div className={styles.ownerPreview} aria-label="Example TurfMate owner dashboard">
 <div className={styles.consoleTop}><Brand/><div><span/><span/><span/></div></div>
 <div className={styles.consoleBody}><aside aria-hidden="true"><i/><i/><i/><i/></aside><div className={styles.consoleMain}>
  <div className={styles.consoleTitle}><div><small>TODAY</small><h3>Your turf at a glance</h3></div><span>+ New booking</span></div>
  <div className={styles.metrics}><div><small>Bookings</small><b>12</b><em>+3 today</em></div><div><small>Occupancy</small><b>78%</b><em>On track</em></div><div><small>Collected</small><b>₹8,400</b><em>6 paid</em></div></div>
  <div className={styles.schedule}><div className={styles.scheduleHead}><b>Today’s schedule</b><small>FRI, 11 SEP</small></div>{['07:00 AM  Morning Strikers','05:30 PM  City Football Club','07:00 PM  Rahul & friends'].map((item,index)=><div key={item} className={index===2?styles.currentBooking:''}><time>{item.slice(0,8)}</time><span>{item.slice(10)}</span><em>{index===1?'Pending':'Confirmed'}</em></div>)}</div>
 </div></div>
</div>}

export default function Home(){return <main className={styles.page}>
 <header className={styles.header}><div className={styles.navWrap}><Brand/><nav className={styles.desktopNav} aria-label="Primary navigation"><a href="#how-it-works">How it works</a><a href="#features">Features</a></nav><div className={styles.navActions}><Link href="/owner/login" className={styles.login}>Owner login</Link><Link href="/owner/onboarding" className={styles.smallCta}>Get started <ArrowRight size={15}/></Link></div><details className={styles.mobileMenu}><summary aria-label="Open navigation"><Menu size={22}/></summary><nav aria-label="Mobile navigation"><a href="#how-it-works">How it works</a><a href="#features">Features</a><Link href="/owner/login">Owner login</Link><Link href="/owner/onboarding">Get started</Link></nav></details></div></header>
 <section className={styles.hero}><div className={styles.heroGrid}><div className={styles.heroCopy}><p className={styles.eyebrow}><span/> BUILT FOR INDEPENDENT TURF OWNERS</p><h1>Bookings in.<br/><em>Game on.</em></h1><p className={styles.heroText}>Your own booking link, live availability and simpler payments—without the calls, spreadsheets or scheduling chaos.</p><div className={styles.heroActions}><Link href="/owner/onboarding" className={styles.primaryCta}>Create your workspace <ArrowRight size={18}/></Link><a href="#how-it-works" className={styles.textCta}>See how it works</a></div><p className={styles.supportLine}><Check size={15}/> Quick setup <span/> No app needed for players <span/> Built for India</p></div><div className={styles.previewWrap}><BookingPreview/><div className={styles.floatingNote}><span><CalendarCheck size={18}/></span><div><b>Slot confirmed</b><small>Friday · 7:00 PM</small></div></div></div></div></section>
 <section id="how-it-works" className={styles.section}><div className={styles.sectionIntro}><p className={styles.kicker}>HOW IT WORKS</p><h2>From empty slot to confirmed game.</h2><p>Give players a smoother way to book while you stay in control of every hour.</p></div><div className={styles.steps}><article><span>01</span><div className={styles.stepIcon}><SlidersHorizontal/></div><h3>Set up your turf</h3><p>Add your hours, pricing, payment preferences and the details players need.</p></article><article><span>02</span><div className={styles.stepIcon}><Smartphone/></div><h3>Share your booking link</h3><p>Put it on WhatsApp, Instagram or Google so players can book without calling.</p></article><article><span>03</span><div className={styles.stepIcon}><CalendarCheck/></div><h3>Manage every game</h3><p>See bookings, payment status and schedule changes from one clear owner workspace.</p></article></div></section>
 <section id="features" className={`${styles.section} ${styles.featuresSection}`}><div className={styles.sectionIntro}><p className={styles.kicker}>EVERYTHING IN ONE PLACE</p><h2>The essentials for a better-run turf.</h2><p>Practical tools for daily operations, built around how independent venues actually work.</p></div><div className={styles.featureGrid}>{features.map(({icon:Icon,title,text})=><article key={title}><span><Icon size={22}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className={`${styles.section} ${styles.playerSection}`}><div className={styles.playerCard}><div><p className={styles.kicker}>FOR YOUR PLAYERS</p><h2>No download. No account. Just book.</h2><p>Players open your unique TurfMate link, choose an available time, enter their details and complete the payment option you’ve enabled.</p><ul><li><Check/> Works in any modern mobile browser</li><li><Check/> Clear availability and upfront pricing</li><li><Check/> Booking details stay easy to find</li></ul></div><div className={styles.playerFlow}><span><CalendarDays/><b>Pick a time</b></span><ArrowRight/><span><UserRound/><b>Add details</b></span><ArrowRight/><span><CreditCard/><b>Confirm</b></span></div></div></section>
 <section className={`${styles.section} ${styles.ownerSection}`}><div className={styles.ownerGrid}><div className={styles.ownerCopy}><p className={styles.kicker}>FOR TURF OWNERS</p><h2>Your day, finally in one view.</h2><p>Open TurfMate to see what’s booked, what still needs payment and where your next open slot is—then make changes without rebuilding a spreadsheet.</p><Link href="/owner/login" className={styles.ownerLink}>Explore the owner workspace <ArrowRight size={17}/></Link></div><OwnerPreview/></div></section>
 <section className={styles.finalCta}><div><p className={styles.kicker}>READY WHEN YOU ARE</p><h2>Make booking your turf the easiest part of the game.</h2><p>Set up your TurfMate workspace and start sharing one simple booking link.</p><Link href="/owner/onboarding" className={styles.limeCta}>Create your workspace <ArrowRight size={18}/></Link></div></section>
 <footer className={styles.footer}><div className={styles.footerTop}><div><Brand/><p>Booking and management software for independent turf owners.</p></div><nav aria-label="Legal and support"><Link href="/contact">Contact</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/cancellation-policy">Cancellation policy</Link><Link href="/refund-policy">Refund policy</Link></nav></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} TurfMate</span><span>Made for the games that bring people together.</span></div></footer>
</main>}
