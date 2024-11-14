const light = document.querySelector('#Light');
const Dark = document.querySelector('#Dark');
const Main = document.querySelector('#main-content');
const buttonSelect = document.querySelector('#button-selectplayer');

const svgs = document.querySelectorAll('svg');


light.addEventListener('click', () => {
        Main.classList.add("dark-mode");
        Dark.style.color ="#C5630C";
        light.style.color ="#415057";
        buttonSelect.style.boxshadow = 'insegt 2px 10px 10px #ffff';

  
   
});

Dark.addEventListener('click', () => {
        Main.classList.remove("dark-mode");
        Dark.style.color ="#415057";
        light.style.color ="#C5630C";

     
    
});

svgs.forEach( (svg) => {
            if(svg === svg.classList.add('active')){
                svg.classList.remove('active');
            }else{
                svg.classList.add('active');
            }
     
    });
