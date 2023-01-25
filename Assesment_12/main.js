const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFiles = ['./images/pic1.jpg', './images/pic2.jpg','./images/pic3.jpg','./images/pic4.jpg','./images/pic5.jpg'];
/* Declaring the alternative text for each image file */
const altTxt = {'pic1.jpg':'Human eye', 'pic2.jpg':'wave', 'pic3.jpg':'Flower', 'pic4.jpg':'Drawing', 'pic5.jpg':'butterfly'};
/* Looping through images */
for(const imageFile of imageFiles){
const newImage = document.createElement('img');
newImage.setAttribute('src', imageFile);
newImage.setAttribute('alt', altTxt[imageFile]);
thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', (event) =>{
    //console.log(event.target)
    displayedImage.setAttribute('src', event.target.src);
})

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    if(btn.getAttribute('class') === 'dark'){
        btn.setAttribute('class', 'light')
        btn.textContent = 'Lighten'
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    else{
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken'
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
})

