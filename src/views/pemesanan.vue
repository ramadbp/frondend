<template>
  <div class="container mt-5">
    <h2 class="mb-4">Halaman Pemesanan</h2>

    <div class="row mb-4">
      <div class="col-md-6">
        <label for="product" class="form-label">Pilih Produk</label>
        <select v-model="selectedProduct" class="form-select" id="product">
          <option disabled value="">-- Pilih Produk --</option>
          <option v-for="product in products" :key="product.id" :value="product">
            {{ product.name }} - Rp{{ product.price }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="quantity" class="form-label">Jumlah</label>
        <input type="number" class="form-control" id="quantity" v-model.number="quantity" min="1" />
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <button class="btn btn-primary w-100" @click="addToCart">+ Tambah ke Keranjang</button>
      </div>
    </div>

    <h5>Keranjang</h5>
    <table class="table">
      <thead>
        <tr>
          <th>Produk</th>
          <th>Jumlah</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>Rp{{ item.price * item.quantity }}</td>
          <td><button class="btn btn-sm btn-danger" @click="removeItem(index)">Hapus</button></td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center">
      <h5>Total: Rp{{ total }}</h5>
      <button class="btn btn-success" @click="submitOrder">Kirim Pesanan</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: "Tenda consina", price: 450000 },
        { id: 2, name: "sepatu eiger", price: 200000 },
        { id: 3, name: "jaket gorpcore tnf", price: 350000 },
        { id: 1, name: "Sleyer pendaki", price: 30000 },
        { id: 2, name: "topi arai waterproof", price: 50000 },
        { id: 3, name: "celana cargo", price: 110000 },
      ],
      selectedProduct: "",
      quantity: 1,
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    addToCart() {
      if (!this.selectedProduct || this.quantity < 1) {
        alert("Pilih produk dan jumlah yang valid.");
        return;
      }

      const existing = this.cart.find((item) => item.id === this.selectedProduct.id);
      if (existing) {
        existing.quantity += this.quantity;
      } else {
        this.cart.push({
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          price: this.selectedProduct.price,
          quantity: this.quantity,
        });
      }

      // Reset
      this.selectedProduct = "";
      this.quantity = 1;
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
    submitOrder() {
      if (this.cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
      }

      // Kirim ke backend (contoh)
      const orderData = {
        items: this.cart,
        total: this.total,
      };

      // Simulasi pengiriman (nanti bisa diganti dengan axios.post)
      console.log("Pesanan dikirim:", orderData);
      alert("Pesanan berhasil dikirim!");
      this.cart = [];
    },
  },
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
