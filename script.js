'use strict';

const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');
// --------------------------------------------------------------------------------------------//
const getPeriod = function(period){
    if(period === 'daily') return 'Day';
    if(period === 'monthly') return 'Month';
    if(period === 'weekly') return 'Week';
}

// show the data on screen
const renderData = function(data, period){
    const lastPeriod = document.querySelectorAll(`.last-period`);
    lastPeriod.forEach( lastPeriod => lastPeriod.innerHTML = `Last ${getPeriod(period)}` );
    
    data.forEach( item => {      
        const title = item.title.toLowerCase().split(' ').join('');
        const section = document.querySelector(`.card-${title}`);
        
        if(section){
            const itemHrs = document.querySelector(`.${title}-hrs`);
            const lastItemHrs = document.querySelector(`.last-${title}-hrs`);
            
            itemHrs.innerHTML = item.timeframes[period].current;
            lastItemHrs.innerHTML = item.timeframes[period].previous;  
        }
        
    });
}


// nav links toggle active class
navLinks.addEventListener('click', function(event) {
    const clicked = event.target.closest('.nav-link'); 
    const period = clicked.dataset.period;

    if (clicked) {
        navLink.forEach(link => link.classList.remove('active')); // Remove 'active' from all links
        
        clicked.classList.add('active'); // Add 'active' to the clicked link
    }
    fetchData(period);
});


// fetch the json data
const fetchData = async function(period) {
    const res = await fetch('./data.json');
    const data = await res.json();
    renderData(data, period);
}
// init
fetchData('weekly');