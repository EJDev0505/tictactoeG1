const SelectPlayer = document.querySelector('#button-selectplayer');
const displayText = SelectPlayer.querySelector('.display');
const ListDown = document.querySelector('.listDown');
const listItems = document.querySelectorAll('.listDown li');
const startGame = document.querySelector('#button-start');

let previouslySelectedItem = null; // Store the previously selected item

const OpenSelect = () => {
    SelectPlayer.style.height = 'auto';
    SelectPlayer.style.borderRadius = '0px';
    SelectPlayer.setAttribute('data-open', 'true'); // Set attribute to track open state
}

const CloseSelect = () => {

    if(window.innerWidth <= 530){
        SelectPlayer.style.height = '3rem';
    }else{
        SelectPlayer.style.height = '4rem';
    }
    
    SelectPlayer.style.borderRadius = '5px';
    SelectPlayer.setAttribute('data-open', 'false'); // Set attribute to track closed state
}
window.addEventListener('resize', CloseSelect);

// Toggle dropdown on SelectPlayer click
SelectPlayer.addEventListener('click', () => {
    if (SelectPlayer.getAttribute('data-open') === 'true') {
        CloseSelect(); 
    } else {
        OpenSelect();   
    }
});

// Add click event to each list item to update the display text, remove item, and re-add previous item if needed
listItems.forEach(item => {
    item.addEventListener('click', () => {

        if (previouslySelectedItem) {
            ListDown.appendChild(previouslySelectedItem);
        }

        // Update display with the current selection
        displayText.textContent = item.textContent;

        if (item.textContent === "Two Player") {
            selectedPathDirectory = "/twoPlayer";

            
        } else if (item.textContent === "Three Player") {
            selectedPathDirectory = "/threePlayer";

            

        } else if (item.textContent === "Four Player") {
            selectedPathDirectory = "/fourPlayer";

           

        }



        previouslySelectedItem = item;
        item.remove(); 

         SelectPlayer.style.height = '4rem';
    });
});

const deleteSelectonPath = () => {
    if(selectedPathDirectory = "/twoPlayer" === item.textContent === "Three Player"){
        item.remove(); 

    }else if(selectedPathDirectory = "/threePlayer" === item.textContent === "Three Player"){
            item.remove(); 

    }else if(selectedPathDirectory = "/fourPlayer" === item.textContent === "Three Player") {
            item.remove(); 
    }
}

startGame.addEventListener('click', () => {
    if (selectedPathDirectory) {
        window.location.href = selectedPathDirectory;
    } else {
        alert('Please select a player before starting the game.');
    }
});
