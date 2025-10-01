const form = document.getElementById("miForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que el formulario recargue la página

  // Obtener opción seleccionada
  const seleccion = document.querySelector('input[name="respuesta"]:checked');
  if (!seleccion) {
    alert("Por favor selecciona una opción antes de continuar.");
    return;
  }

  const valorSeleccionado = seleccion.value;
  console.log("Opción seleccionada:", valorSeleccionado);

  try {
    const response = await fetch("/ruta-a-tu-backend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuesta: valorSeleccionado })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    // Mensaje o acción posterior
    alert("Encuesta enviada con éxito!");
  } catch (error) {
    console.error("Error al enviar la encuesta:", error);
    alert("Ocurrió un error al enviar la encuesta.");
  }
});
