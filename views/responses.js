document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "./responses.php"; // Ajusta el nombre si es diferente

  const btnTodas = document.getElementById("todas");
  const btnNutri = document.getElementById("nutri");
  const btnFisica = document.getElementById("fisica");
  const btnMedica = document.getElementById("medica");

  const main = document.querySelector("main");

  // Crear contenedor de resultados
  const resultadosDiv = document.createElement("div");
  resultadosDiv.id = "resultados";
  resultadosDiv.style.marginTop = "20px";
  main.appendChild(resultadosDiv);

  // ================================
  // Función principal: obtener datos
  // ================================
  async function obtenerDatos(filtros = {}) {
    try {
      resultadosDiv.innerHTML = "<p>Cargando datos...</p>";

 // Quita clases previas y aplica nueva
    resultadosDiv.className = "";
      if (!filtros.area) resultadosDiv.classList.add("todas");
      else resultadosDiv.classList.add(filtros.area.toLowerCase());

      // Construir query string dinámicamente
      const queryString = new URLSearchParams(filtros).toString();
      const url = queryString ? `${API_URL}?${queryString}` : API_URL;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data.message);
      console.log(data.count);

    // Formatear fechas
      const fechasFormateadas = data.data.map(item => {
      const fecha = new Date(item.fecha.replace(" ", "T"));
      const hora = fecha.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      const dia = fecha.getDate().toString().padStart(2, "0");
      const mes = fecha.toLocaleString("es-MX", { month: "long" });
      const año = fecha.getFullYear();
      return `${dia} de ${mes} del ${año} a las ${hora}`;
      });

    // Agregar al objeto principal
      data.fechasFormateadas = fechasFormateadas;



      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al obtener los datos");
      }

      mostrarResultados(data);
    } catch (error) {
      resultadosDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
  }

  // ================================
  // Mostrar resultados en tabla
  // ================================
function mostrarResultados({ data, message, count, fechasFormateadas }) {
  if (count === 0) {
    resultadosDiv.innerHTML = `<p>No se encontraron registros con los filtros aplicados.</p>`;
    return;
  }

  let html = `<p><strong>${message}</strong> (${count} resultados)</p>`;
  html += `<table id="respuestas-table" class="display">
      <thead>
        <tr>
          <th>Fecha contestado</th>
          <th>Área de atención</th>
          <th>Experiencia</th>
          <th>Comentarios</th>
        </tr>
      </thead>
      <tbody>`;

data.forEach((row, i) => {
  html += `
    <tr>
      <td>${fechasFormateadas[i] || ""}</td>
      <td>${row.p1_area_atencion || ""}</td>
      <td>${row.p2_experiencia || ""}</td>
      <td>${row.comentarios || ""}</td>
    </tr>`;
});

  html += "</tbody></table>";
  resultadosDiv.innerHTML = html;

  // Inicializar DataTable (esperar a que el DOM se actualice)
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#respuestas-table")) {
      $("#respuestas-table").DataTable().destroy();
    }

    $("#respuestas-table").DataTable({
      pageLength: 10,
      order: [[0, 'desc']],  // ✅ CORRECTO - array de arrays
      lengthMenu: [5, 10, 25, 50, 100],
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json"
      }
    });
  }, 0);
}


  // ================================
  // Eventos de botones
  // ================================
  btnTodas.addEventListener("click", () => obtenerDatos());
  btnNutri.addEventListener("click", () => obtenerDatos({ area: "Nutricion" }));
  btnFisica.addEventListener("click", () => obtenerDatos({ area: "Fisica" }));
  btnMedica.addEventListener("click", () => obtenerDatos({ area: "Medicina" }));

  // Carga inicial
  obtenerDatos();
});
