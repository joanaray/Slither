const buttons = document.querySelectorAll('.board-dots button');

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        alert('clicked!');
    })
})