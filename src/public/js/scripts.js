const consultarCarta = async (id, number) => {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
        if (!response.ok) {
            throw new Error("Ocurrió un error al realizar la petición");
        }
        const data = await response.json();
        pintarCarta(data.data[0], number);
    } catch (error) {
        console.log(error);
    }
  };
  
  consultarCarta();
  
  const lista = document.getElementById("listarcartas");
  
  const pintarCarta = (data, id) => {
    let item = lista.querySelector(`#card-${id}`);
    item.querySelector("img").setAttribute("src", data.card_images[0].image_url);
    item.querySelector("p").textContent = data.name;
  };
  