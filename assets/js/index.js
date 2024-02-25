$("#btnBuscar").on("click", function () {
  limpiarErrores();
  let heroId = Number($("#inputHero").val());
  let validadarHero = /[0-9]/gim;
  if (validadarHero.test(heroId)) {
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
