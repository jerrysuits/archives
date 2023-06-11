import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-white text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
 

        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <link rel='https://i.pinimg.com/564x/1b/d9/1f/1bd91f0e65683dd8bfc807440b170be2.jpg'></link>
                  <i className="fas fa-gem me-3 text-secondary"></i>ARCHIVE
                </h6>
                <p>
                Welcome to the archive, the ultimate social media platform for photo enthusiasts! Whether you're a professional photographer or just love capturing beautiful moments, the archive is the perfect place to showcase your talent and connect with like-minded individuals.
                </p>
              </div>

           

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact us</h6>
                <p><i className="fas fa-home me-3 text-secondary"></i> Nairobi, NBO 10012, Kenya</p>
                <p>
                  <i className="fas fa-envelope me-3 text-secondary"></i>
                  archive@yahoo.com
                </p>
                <p><i className="fas fa-phone me-3 text-secondary"></i> + 254 167 227 383</p>
                <p><i className="fas fa-print me-3 text-secondary"></i> + 254 234 786 267</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}>
          © 2023  <span></span>
          <a className="text-reset fw-bold">THE ARCHIVE</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
