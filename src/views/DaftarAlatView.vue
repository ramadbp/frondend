<template>
  <div class="container my-5">
    <h2 class="mb-4">Daftar Alat Outdoor</h2>
    <button
      class="btn btn-primary mb-3"
      data-bs-toggle="modal"
      data-bs-target="#alatModal"
      @click="openModal()"
    >
      Tambah Alat
    </button>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.nama }}</td>
          <td>{{ item.deskripsi }}</td>
          <td>Rp {{ item.harga }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#alatModal"
              @click="openModal(item)"
            >
              Edit
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="alatModal"
      tabindex="-1"
      aria-labelledby="alatModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitItem">
            <div class="modal-header">
              <h5 class="modal-title" id="alatModalLabel">{{ isEdit ? "Edit" : "Tambah" }} Alat</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Nama</label>
                <input v-model="form.nama" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea v-model="form.deskripsi" class="form-control" required></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Harga</label>
                <input v-model.number="form.harga" type="number" class="form-control" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">
                {{ isEdit ? "Simpan" : "Tambah" }}
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      isEdit: false,
      form: {
        id: null,
        nama: "",
        deskripsi: "",
        harga: "",
      },
      API_URL: "https://backend-outdor.rdan60404.workers.dev/api/alat",
    };
  },
  methods: {
    fetchItems() {
      fetch(this.API_URL)
        .then((res) => res.json())
        .then((data) => (this.items = data));
    },
    openModal(item = null) {
      this.isEdit = !!item;
      this.form = item ? { ...item } : { id: null, nama: "", deskripsi: "", harga: "" };
    },
    submitItem() {
      const method = this.isEdit ? "PUT" : "POST";
      const url = this.isEdit ? `${this.API_URL}/${this.form.id}` : this.API_URL;

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      }).then(() => {
        this.fetchItems();
        document.querySelector("#alatModal .btn-close").click(); // tutup modal
      });
    },
    deleteItem(id) {
      if (confirm("Yakin ingin menghapus alat ini?")) {
        fetch(`${this.API_URL}/${id}`, { method: "DELETE" }).then(() => this.fetchItems());
      }
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>
