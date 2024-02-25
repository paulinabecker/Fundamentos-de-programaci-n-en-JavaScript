$("#btnBuscar").on("click", function () {
    limpiarErrores();
    let heroId = Number($("#inputHero").val());
    let validadorHero = /[0-9]/gim;
    if (validadorHero.test(heroId)) {
      $("#resultadoHero").ApiHero();
    } else {
      let errormsje = $("#errorHero").append(
        `<p class="text-center fs-2">Ingresa un numero entre 1 y 731</p>`
      );
      setTimeout(() => {
        errormsje.empty();
      }, 5000);
    }
  });
  
  function limpiarErrores() {
    const errorHero = $("#errorHero");
    errorHero.empty();
  }

  jQuery.fn.ApiHero = function () {
    const tokenApi = "10161099658556112";
    let heroId = Number($("#inputHero").val());
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/${tokenApi}/${heroId}`,
      dataType: "json",
      success: function (dataHero) {
        limpiarCard();
        mostrarHero(dataHero);
        graficoHero(dataHero);
      },
      error: function (error) {
        element.append(`<p>No se encontro información</p>`);
      },
    });
  };
  
  function mostrarHero(dataHero) {
    $("#resultadoHero").append(
      `<h1 id="tituloHero">SuperHero Encontrado</h1>
            <div id="cardHero" class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${dataHero.image.url}" class="img-fluid rounded-start" alt="Foto ${dataHero.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Nombre: ${dataHero.name}</h5>
                            <p class="card-text">Conexiones: ${dataHero.connections["group-affiliation"]}; ${dataHero.connections.relatives}</p>
                            <p class="card-text border-bottom">Publicado por: ${dataHero.biography.publisher}</small></p>
                            <p class="card-text border-bottom">Ocupación: ${dataHero.work.occupation}</p>
                            <p class="card-text border-bottom">Primera Aparición: ${dataHero.biography["first-appearance"]} </p>
                            <p class="card-text border-bottom">Altura: ${dataHero.appearance.height[0]} - ${dataHero.appearance.height[1]}  </p>
                            <p class="card-text border-bottom">Peso: ${dataHero.appearance.weight[0]} - ${dataHero.appearance.weight[1]}  </p>
                            <p class="card-text">Alias: ${dataHero.biography.aliases}</p>
                        </div>
                    </div>
                </div>
            </div>`
    );
  }
  
  function graficoHero(dataHero) {
    let options = {
      title: {
        text: `Estadísticas de Poder para ${dataHero.name}`,
      },
      animationEnabled: true,
      data: [
        {
          type: "pie",
          startAngle: 40,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} ({y})",
          dataPoints: [
            { y: `${dataHero.powerstats.intelligence}`, label: "Inteligencia" },
            { y: `${dataHero.powerstats.strength}`, label: "Fuerza" },
            { y: `${dataHero.powerstats.speed}`, label: "Velocidad" },
            { y: `${dataHero.powerstats.durability}`, label: "Durabilidad" },
            { y: `${dataHero.powerstats.power}`, label: "Poder" },
            { y: `${dataHero.powerstats.combat}`, label: "Combate" },
          ],
        },
      ],
    };
    $("#chartContainer").CanvasJSChart(options);
  }
  
  function limpiarCard() {
    const cardHero = $("#resultadoHero");
    cardHero.empty();
  }
  