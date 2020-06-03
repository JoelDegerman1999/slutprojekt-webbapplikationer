<template>
  <div class="container">
    <section class="product">
      <img src="@/assets/hoodie-ocean.png" class="product-img" />
      <div class="product-info">
        <h1>PRODUCT TITLE</h1>
        <h2>599 kr</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
          corrupti quasi itaque numquam voluptas exercitationem corporis harum
          eaque incidunt repellat!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          error maxime deleniti excepturi vero expedita ad, autem dolor! Ab,
          enim?
        </p>
        <button>ADD TO CART</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  padding: 4rem;

  .product {
    display: flex;
    justify-content: center;
    .product-img {
      width: 30%;
    }
    .product-info {
      margin-top: 5rem;
      margin-left: 2rem;
      text-align: left;
      width: 40rem;
    }
  }
}
</style>
