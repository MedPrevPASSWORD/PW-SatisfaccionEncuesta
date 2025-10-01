document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("success-alert").style.display = 'none';
});
const form = document.getElementById("miForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener respuestas
  const area = document.querySelector('input[name="p1-area_atencion"]:checked');
  const experiencia = document.querySelector('input[name="p2-experiencia"]:checked');
  const puntualidad = document.querySelector('input[name="p3-puntualidad"]:checked');
  const recomendacion = document.querySelector('input[name="p4-recomendacion"]:checked');
  const comentarios = document.getElementById("comentario").value.trim();

  // Validación
  if (!area || !experiencia || !puntualidad || !recomendacion) {
    alert("Por favor responde todas las preguntas obligatorias.");
    return;
  }

  const datos = {
    area_atencion: area.value,
    experiencia: experiencia.value,
    puntualidad: puntualidad.value,
    recomendacion: recomendacion.value,
    comentarios: comentarios
  };

  try {
    const response = await fetch("php/send_response.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    showSuccessAlert();
    form.reset();


  } catch (error) {
    console.error("Error al enviar la encuesta:", error);
    alert("Ocurrió un error al enviar la encuesta.");
  }
});



function showSuccessAlert() {
  const alertBox = document.getElementById('success-alert');
  const button = document.getElementById('btnFinalizar');
  button.style.display = 'none';
  alertBox.style.display = 'flex';
  

  setTimeout(() => {

    button.style.display = 'flex';
    alertBox.style.display = 'none';
  }, 3000);
}
