document.addEventListener('DOMContentLoaded', (event) => {
    const text = document.querySelector('.Task_text');
    const description = document.getElementById('Description');
    const date = document.getElementById('Time');
    const btn1 = document.getElementById('Add_task');
    const output = document.getElementById('Output');

    function fun1() {
        output.innerHTML = `<p>Task: ${text.value}</p>
                            <p>Description: ${description.value}</p>
                            <p>Due Date: ${date.value}</p>`;
    }

    btn1.addEventListener('click', fun1);
});
