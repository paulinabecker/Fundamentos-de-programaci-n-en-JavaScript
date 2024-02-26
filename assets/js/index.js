$("#btnBuscar").on("click", () => {
  limpiarErrores();
  let heroId = Number($("#inputHero").val());

  validarHeroId(heroId)
      .then(() => {
          $("#resultadoHero").ApiHero();
      })
      .catch(error => {
          $("#errorHero").append(`<p class="text-center fs-2">${error}</p>`);
          setTimeout(() => {
              limpiarErrores();
          }, 5000);
      });
});

const validarHeroId = (heroId) => {
  return new Promise((resolve, reject) => {
      let validarHero = /[0-9]/gim;
      if (validarHero.test(heroId) && heroId >= 1 && heroId <= 731) {
          resolve();
      } else {
          reject("Ingresa un número entre 1 y 731");
      }
  });
};

const limpiarErrores = () => {
  const errorHero = $("#errorHero");
  errorHero.empty();
};