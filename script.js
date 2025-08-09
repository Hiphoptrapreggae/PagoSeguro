


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


const pagoForm = document.getElementById('pagoForm');
if (pagoForm) {
    pagoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // Validar selección de números desde localStorage
        let seleccionadosCount = 0;
        const val = localStorage.getItem('numerosSeleccionados') || '';
        if (val) {
            seleccionadosCount = val.split(',').filter(x => x).length;
        }
        if (seleccionadosCount === 0) {
            const mensajeDiv = document.getElementById('mensaje');
            if (mensajeDiv) mensajeDiv.textContent = 'Debes seleccionar al menos un número de rifa.';
            return;
        }
        const form = e.target;
        const formData = new FormData(form);
        const mensajeDiv = document.getElementById('mensaje');
        if (mensajeDiv) mensajeDiv.textContent = 'Enviando...';
        try {
            const response = await fetch('https://rifasvenezuela.onrender.com/api/pago', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                if (mensajeDiv) mensajeDiv.textContent = data.mensaje || '¡Tus números han sido apartados! Serán confirmados cuando se verifique el pago en la cuenta bancaria.';
                form.reset();
                localStorage.removeItem('numerosSeleccionados');
                mostrarSeleccionados();
            } else {
                if (mensajeDiv) mensajeDiv.textContent = data.error || 'Error al enviar el pago.';
            }
        } catch (err) {
            if (mensajeDiv) mensajeDiv.textContent = 'Error de conexión.';
        }
    });
}
