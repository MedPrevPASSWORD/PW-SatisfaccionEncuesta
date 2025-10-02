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



const spanSatisfecho = document.getElementById("satisfecho-icon");
const spanNormal = document.getElementById("normal-icon");
const spanInsatisfecho = document.getElementById("insatisfecho-icon");

const spansAreas = [
  document.getElementById("Nutricion"),
  document.getElementById("medicina"),
  document.getElementById("fisica"),
  document.getElementById("satisfecho"),
  document.getElementById("normal"),
  document.getElementById("insatisfecho"),

  // IMAGENES

  
];

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


  }, 5000);
}


function toggleDisplay(showId, hideIds) {
  document.getElementById(showId).style.display = 'flex';
  document.getElementById(showId).style.fontSize = '20px';
  hideIds.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

document.getElementById("satisfecho-icon").addEventListener("click", function() {
  toggleDisplay("satisfecho", ["normal", "insatisfecho"]);
});

document.getElementById("normal-icon").addEventListener("click", function() {
  toggleDisplay("normal", ["satisfecho", "insatisfecho"]);
});

document.getElementById("insatisfecho-icon").addEventListener("click", function() {
  toggleDisplay("insatisfecho", ["satisfecho", "normal"]);
});

document.getElementById("nutricion-icon").addEventListener("click", function() {
  toggleDisplay("Nutricion", ["medicina", "fisica"]);
});

document.getElementById("medicina-icon").addEventListener("click", function() {
  toggleDisplay("medicina", ["Nutricion", "fisica"]);
});

document.getElementById("fisica-icon").addEventListener("click", function() {
  toggleDisplay("fisica", ["Nutricion", "medicina"]);
});
