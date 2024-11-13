# Tampilan Home Awal

![image](https://github.com/user-attachments/assets/73ff9b09-79db-429e-8f61-dfca46231a07)

Ini adalah tampilan awal ketika kita mengakses url websitenya. Tidak ada isi data di dalamnya.
Halaman tersebut berasal dari kode ini
```dart
<!-- mahasiswa.page.html -->
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Data Mahasiswa</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Data Mahasiswa</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-card *ngFor="let item of dataMahasiswa">
    <ion-item>
      <ion-label>
        {{item.nama}}
        <p>{{item.jurusan}}</p>
      </ion-label>
      <ion-button expand="block" (click)="openModalEdit(true,item.id)">Edit</ion-button>
      <ion-button color="danger" slot="end" (click)="showConfirmAlert(item.id)">Hapus</ion-button>
    </ion-item>
  </ion-card>
</ion-content>

<!-- button tambah -->
<ion-card>
  <ion-button (click)="openModalTambah(true)" expand="block">
    Tambah Mahasiswa
  </ion-button>
</ion-card>
```

# Tampilan Tambah Mahasiswa

![image](https://github.com/user-attachments/assets/a4bf00ac-ca3e-44a3-b0e4-d20c09ecb980)
![image](https://github.com/user-attachments/assets/98e68bd6-f911-4505-8f3c-6560b5a84d11)

Ini adalah halaman ketika kita ingin menambahkan data mahasiswa. Halaman ini berasal dari kode ini
```dart
<!-- modal tambah -->
<ion-modal [isOpen]="modalTambah" (ionModalDidDismiss)="cancel()">
  <ng-template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">Batal</ion-button>
        </ion-buttons>
        <ion-title>Tambah Mahasiswa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
<!-- KOLOM NAMA MAHASISWA -->
      <ion-item>
        <ion-input label="Nama Mahasiswa" labelPlacement="floating" required [(ngModel)]="nama"
          placeholder="Masukkan Nama Mahasiswa" type="text">
        </ion-input>
      </ion-item>
<!-- KOLOM JURUSAN MAHASISWA -->
      <ion-item>
        <ion-input label="Jurusan Mahasiswa" labelPlacement="floating" required [(ngModel)]="jurusan"
          placeholder="Masukkan Jurusan Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" (click)="tambahMahasiswa()" color="primary" shape="full" expand="block">
            Tambah Mahasiswa
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ng-template>
</ion-modal>
```

# Tampilan Setelah Sukses Menambahkan Data Mahasiswa

![image](https://github.com/user-attachments/assets/f8d0f64a-0239-4d5c-a32c-3840ca297d99)

Alert ini menunjukkan bahwa data sudah berhasil ditambahkan. Alert ini berasal dari kode ini.
```dart
tambahMahasiswa() {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: () => {
          this.resetModal();
          this.getMahasiswa();
          this.modalTambah = false;
          this.showAlert('Data successfully added.'); //alert yang menunjukkan data berhasil ditambah
        },
      });
  }
  ```

# Tampilan Edit Mahasiswa

![image](https://github.com/user-attachments/assets/6564c6ae-88bb-4c00-9292-3d803751b403)
![image](https://github.com/user-attachments/assets/ec7766a2-75c0-4582-937d-6c4fe68ad3bf)

Ini adalah halaman ketika kita ingin mengedit data mahasiswa. Halaman ini berasal dari kode ini
```dart
<!-- modal edit -->
<ion-modal [isOpen]="modalEdit" (ionModalDidDismiss)="cancel()">
  <ng-template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">Batal</ion-button>
        </ion-buttons>
        <ion-title>Edit Mahasiswa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
<!-- KOLOM NAMA MAHASISWA -->
      <ion-item>
        <ion-input label="Nama Mahasiswa" labelPlacement="floating" required [(ngModel)]="nama"
          placeholder="Masukkan Nama Mahasiswa" type="text">
        </ion-input>
      </ion-item>
<!-- KOLOM JURUSAN MAHASISWA -->
      <ion-item>
        <ion-input label="Jurusan Mahasiswa" labelPlacement="floating" required [(ngModel)]="jurusan"
          placeholder="Masukkan Jurusan Mahasiswa" type="text">
        </ion-input>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button type="button" (click)="editMahasiswa()" color="primary" shape="full" expand="block">
            Edit Mahasiswa
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ng-template>
</ion-modal>
```

# Tampilan Setelah Sukses Mengedit Data Mahasiswa

![image](https://github.com/user-attachments/assets/32f3be97-1a90-498a-8607-7a5008c705e3)

Alert ini menunjukkan bahwa data sudah berhasil diedit. Alert ini berasal dari kode ini.
```dart
editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.edit(data, 'edit.php').subscribe({
      next: () => {
        this.resetModal();
        this.getMahasiswa();
        this.modalEdit = false;
        this.showAlert('Data successfully edited.'); //alert yang menunjukkan data berhasil diedit
      },
    });
  }
```

# Tampilan Ketika Ingin Menghapus Data Mahasiswa

![image](https://github.com/user-attachments/assets/0dae7493-7958-482d-a6a5-1a0bf8f5e70e)

Alert ini berfungsi untuk meyakinkan apakah Anda benar benar akan menghapus data mahasiswa ini?. Klik 'yes' jika Anda benar-benar ingin menghapus. Klik 'no' jika anda tidak ingin menghapus.
Jika Anda menekan tombol 'no' maka akan kembali ke halaman Data Mahasiswa.
Alert ini berasal dari kode ini.
```dart
async showConfirmAlert(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this data?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.hapusMahasiswa(id);
          },
        },
      ],
    });
    await alert.present();
  }
```
### Tetapi jika Anda menekan tombol 'yes' maka akan muncul alert

![image](https://github.com/user-attachments/assets/ced97d01-54eb-455c-b5a8-1f7c4033ecb0)

Serta data yang tadi dihapus akan menghilang dari halaman.
Alert tersebut muncul karena kode ini
```dart
hapusMahasiswa(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: () => {
        this.getMahasiswa();
        this.showAlert('Data successfully deleted.');
      },
    });
  }
```
