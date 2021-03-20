const list = document.getElementById('list');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');

const socket = io();

addBtn.onclick = () => {
    socket.emit('add', document.getElementById('name').value);
}

removeBtn.onclick = () => {
    socket.emit('remove', document.getElementById('name').value);
}

socket.on('add', names => {
    list.innerHTML += "<p> " + names[names.length - 1] + "</p>";
})

socket.on('remove', names => {
    list.innerHTML = "";
    console.log(names);
    for (item of names) {
        console.log(item);
        list.innerHTML += "<p> " + item + "</p>";
    }
})