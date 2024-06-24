import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './carsPage.module.css';
// import imgcar from '../../assets/images/image_car.png';
// import fisetting from '../../assets/images/fi_settings.png';
// import ficalendar from '../../assets/images/fi_calendar.png';
// import fiusers from '../../assets/images/fi_users.png';
// import empty21 from '../../assets/images/empty-21-128.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const CarsPage : React.FC= () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_carData, setCarData] = useState([]);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [seatInput, setSeatInput] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_carFiltered, _setCarFiltered] = useState([]);

  useEffect(() => {
    const getCarsData = async () => {
      await axios
        .get('https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json')
        .then(res => {
          setCarData(res.data)
        })
        .catch(err => console.log(err));
    }

    getCarsData();
  }, [])

  // const getRandomInt = (min : number, max : number) => {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }
  // const populateCars = carData.map(car => {
  //   const isPositive = getRandomInt(0, 1) === 1;
  //   const timeAt = new Date();
  //   const mutator = getRandomInt(1000000, 100000000);
  //   const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

  //   return {
  //     ...car,
  //     availableAt,
  //   };
  // })

  // const newDateTimeFormat = new Date(`${dateInput} ${timeInput}`);
  // const getEpochTime = newDateTimeFormat.getTime();

  // const filterCar = populateCars.filter(car => car.capacity >= seatInput && (car.availableAt >= getEpochTime));

  // const handleFilterCar = (e : React.FormEvent) => {
  //   e.preventDefault();

  //   setCarFiltered(filterCar);
  // };

  // console.log(carFiltered);

  // const renderCar = carFiltered.map(car => {
  //   return (
  //     <div className={`col-lg-4 card ${styles.cardContainer}`} key={car.id}>
  //       <img src={imgcar} alt={car.manufacture} className={styles.carCardImage} />
  //       <p className={styles.fontCard}>{car.manufacture} {car.model}</p>
  //       <h4 className={styles.fontPrice}>Rp {car.rentPerDay} / hari</h4>
  //       <p className={styles.fontCard}>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  //         do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //       </p>
  //       <p className={styles.fontCard}><img src={fiusers} alt="" />{car.capacity} orang</p>
  //       <p className={styles.fontCard}><img src={fisetting} alt="" />{car.transmission}</p>
  //       <p className={styles.fontCard}><img src={ficalendar} alt="" />tahun {car.year}</p>
  //       <button type="button" className={`btn ${styles.pilihBtn}`}>Pilih Mobil</button>
  //     </div>
  //   );
  // });

  return (
    <>
      <Header />
      <main>
        <section className={`container ${styles.filterCar}`}>
          <form>
            <div className="row">
              <div className={`col ${styles.colMargin} ${styles.col}`}>
                <p>Tipe Driver</p>
                <div className="input-group">
                  <select
                    className={`form-select ${styles.formSelect}`}
                    id="form-style"
                  >
                    <option hidden>Pilih Tipe Driver</option>
                    <option>Dengan Sopir</option>
                    <option>Tanpa Sopir (Lepas Kunci)</option>
                  </select>
                </div>
              </div>
              <div className={`col ${styles.colMarginResponsive} ${styles.col}`}>
                <p>Tanggal</p>
                <div className="input-group">
                  <input
                    type="date"
                    className={`form-control ${styles.formControl}`}
                    id="filter-by-date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </div>
              </div>
              <div className={`col ${styles.colMarginResponsive} ${styles.col}`}>
                <p>Waktu Jemput/Ambil</p>
                <div className="input-group">
                  <input
                    type="time"
                    className={`form-control ${styles.formControl}`}
                    id="filter-by-time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                  />
                </div>
              </div>
              <div className={`col ${styles.colMarginResponsive} ${styles.col}`}>
                <p>Jumlah Penumpang (optional)</p>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="filter-by-seats"
                  placeholder="Jumlah Penumpang"
                  value={seatInput}
                  onChange={(e) => setSeatInput(e.target.value)}
                />
              </div>
              <div className={`col ${styles.colMarginResponsive} ${styles.col}`}>
                <button
                  type="submit"
                  className="btn"
                  id={styles.searchFilter}
                  // onClick={handleFilterCar}
                >
                  Cari Mobil
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="container mt-4">
          <div className="row gap-4" id={styles.carsContainer}>
            {/* {
              carFiltered.length > 0 ? renderCar : (
                <div className="text-center">
                  <img src={empty21} alt="" />
                  <h1>Kosong...</h1>
                  <p>List mobil masih kosong. Silahkan masukkan data di form atas</p>
                </div>
              )
            } */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CarsPage;