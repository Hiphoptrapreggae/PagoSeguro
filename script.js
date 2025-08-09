


// Mostrar los números seleccionados desde localStorage
function mostrarSeleccionados() {
    const val = localStorage.getItem('numerosSeleccionados') || '';
    const seleccionadosDiv = document.getElementById('seleccionados');
    if (seleccionadosDiv) {
        seleccionadosDiv.textContent = val ? 'Números seleccionados: ' + val : '';
    }
    const numerosInput = document.getElementById('numerosSeleccionados');
    if (numerosInput) {
        numerosInput.value = val;
    }
}

mostrarSeleccionados();

document.getElementById('pagoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (seleccionados.size === 0) {
        document.getElementById('mensaje').textContent = 'Debes seleccionar al menos un número de rifa.';
        return;
    }
    const form = e.target;
    const formData = new FormData(form);
    document.getElementById('mensaje').textContent = 'Enviando...';
    try {
    const response = await fetch('https://rifasvenezuela.onrender.com/api/pago', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('mensaje').textContent = data.mensaje || '¡Tus números han sido apartados! Serán confirmados cuando se verifique el pago en la cuenta bancaria.';
            form.reset();
            localStorage.removeItem('numerosSeleccionados');
            mostrarSeleccionados();
        } else {
            document.getElementById('mensaje').textContent = data.error || 'Error al enviar el pago.';
        }
    } catch (err) {
        document.getElementById('mensaje').textContent = 'Error de conexión.';
    }
});
