const form = document.getElementById('main-form');
const tabla = document.getElementById('tabla-body');
const btnCancel = document.getElementById('btn-cancel');
const deleteModal = document.getElementById('delete-modal');
let idToDelete = null;
function notify(msg, isError = false) {
    const box = document.getElementById('flash-msg');
    box.innerText = msg;
    box.className = `fixed top-5 right-5 p-4 rounded-xl shadow-2xl text-center font-bold z-50 animate-bounce ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 3000);}
async function loadData() {
    const res = await fetch('/api/productos');
    const data = await res.json();
    tabla.innerHTML = '';
    data.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-orange-50 transition-all";
        tr.innerHTML = `
            <td class="p-4 font-bold text-gray-600 text-sm">${p.codigo_barras}</td>
            <td class="p-4 text-gray-700 font-medium">${p.nombre}</td>
            <td class="p-4 text-center flex justify-center gap-3">
                <button onclick='editMode(${JSON.stringify(p)})' class="text-blue-500 hover:scale-110 transition-all font-bold">✎</button>
                <button onclick="openDeleteModal(${p.id})" class="text-red-500 hover:scale-110 transition-all font-bold">🗑</button>
            </td>
        `;
        tabla.appendChild(tr);});}
form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    if (!isNaN(nombre)) {
        notify("El nombre no puede ser solo números", true);
        return;}
    if (precio < 0 || stock < 0) {
        notify("Precio o Stock no pueden ser negativos", true);
        return;}
    const payload = {
        codigo: document.getElementById('codigo').value,
        nombre: nombre,
        precio: precio,
        stock: stock,
        descripcion: document.getElementById('descripcion').value};
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/productos/${id}` : '/api/productos';
    const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)});
    const result = await res.json();
    if (res.ok) {
        notify(result.message);
        cancelAll();
        loadData();} 
        else {
        notify(result.message, true);}};
window.openDeleteModal = (id) => {
    idToDelete = id;
    deleteModal.classList.remove('hidden');};
window.closeModal = () => {
    deleteModal.classList.add('hidden');
    idToDelete = null;};
document.getElementById('confirm-delete-btn').onclick = async () => {
    if (idToDelete) {
        await fetch(`/api/productos/${idToDelete}`, { method: 'DELETE' });
        closeModal();
        loadData();
        notify("Registro eliminado correctamente");}};
window.editMode = (p) => {
    document.getElementById('form-title').innerText = "Editando Registro";
    document.getElementById('prod-id').value = p.id;
    document.getElementById('codigo').value = p.codigo_barras;
    document.getElementById('codigo').disabled = true;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('precio').value = p.precio;
    document.getElementById('stock').value = p.stock;
    document.getElementById('descripcion').value = p.descripcion;
    btnCancel.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });};
function cancelAll() {
    form.reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('codigo').disabled = false;
    document.getElementById('form-title').innerText = "Gestionar Producto";
    btnCancel.classList.add('hidden');}
btnCancel.onclick = cancelAll;
window.onload = loadData;