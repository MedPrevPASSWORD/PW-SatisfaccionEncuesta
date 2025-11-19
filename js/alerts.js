function showSuccessAlert() {
  const alertBox = document.getElementById('success-alert');
  const modal = document.getElementById('successModal');
  const button = document.getElementById('btnFinalizar');
  button.style.display = 'none';
  alertBox.style.display = 'flex';
  modal.style.display = 'flex';

  spansAreas.forEach(span => {
    span.style.display = 'none';
  });


  setTimeout(() => {

    button.style.display = 'flex';
    alertBox.style.display = 'none';
    modal.style.display = 'none';

  }, 3000);
}

function showFailedAlert(mensaje) {
    // Crear el elemento de alerta
    const alertBox = document.createElement('div');
    alertBox.id = 'failed-alert-box';
    
    // Estilos principales del contenedor
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(220, 53, 69, 0.3);
        font-size: 14px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 500px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        animation: slideDown 0.3s ease-out;
    `;

    // Crear icono de error
    const icon = document.createElement('span');
    icon.innerHTML = '⚠️';
    icon.style.cssText = `
        font-size: 18px;
        flex-shrink: 0;
    `;

    // Crear contenido del mensaje
    const messageSpan = document.createElement('span');
    messageSpan.textContent = mensaje || 'Error al enviar la encuesta';
    messageSpan.style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;

    // Crear botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        flex-shrink: 0;
    `;

    closeBtn.onmouseover = () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.backgroundColor = 'transparent';
    };

    // Añadir elementos al contenedor
    alertBox.appendChild(icon);
    alertBox.appendChild(messageSpan);
    alertBox.appendChild(closeBtn);

    // Añadir estilos de animación al head si no existen
    if (!document.querySelector('#alert-animations')) {
        const style = document.createElement('style');
        style.id = 'alert-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(-50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) scale(0.95);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Función para remover la alerta
    const removeAlert = () => {
        if (document.getElementById('failed-alert-box')) {
            alertBox.style.animation = 'fadeOut 0.2s ease-in';
            setTimeout(() => {
                if (alertBox.parentNode) {
                    document.body.removeChild(alertBox);
                }
            }, 200);
        }
    };

    // Event listener para el botón de cerrar
    closeBtn.onclick = removeAlert;

    // Añadir al body
    document.body.appendChild(alertBox);

    // Remover automáticamente después de 4 segundos
    setTimeout(removeAlert, 4000);
}