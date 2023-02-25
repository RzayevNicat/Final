import React, { useEffect, useState } from 'react';
import { BsHandbag, BsCheck } from 'react-icons/bs';
import { FiChevronDown,FiChevronUp } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './CheckOut.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// const paymentSchema = Yup.object().shape({
//     name : Yup.string().min(2,'Short Name').max(12,'Long Name').required('Please provide Name'),
//     surname: Yup.string().min(2,'Short Surname').max(20,'Long Surname').required('Please provide Surname'),
//     cardNumber: Yup.string().max(16,'Warning').matches(/^([0-9]{4}[- ]?){3}[0-9]{4}$/,'Please provide valid debit card number').required('Please provide Card Number'),
//     phone : Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,'Invalid phone Number').required('Please provide Phone Number'),
//     email: Yup.string()
//     .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
//     .required('Please provide Email'),
//     postalCode:Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/,'Invalid Postal Code').required('Please provide postal code'),
//     my:Yup.string().matches(/^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/,"Invalid Date").required('Please provide date'),
//     cvv:Yup.string().matches(/^[0-9]{3,4}$/,'Invalid CVV').required('Please provide CVV'),
//     country:Yup.string().required('Please choose country')

// })
function CheckOut() {
	const [ black, setBlack ] = useState('black');
	const count = useSelector((state) => state.baskett.count);
    const [arrow ,setArrow] = useState(true)
    const [product,setProduct] = useState([])
	const [usr,setUsr] = useState({})
	const [ namee, setName ] = useState('');
	const [ surnamee, setSurname ] = useState('');
	const [ emaill, setEmail ] = useState('');
	const [ cardNumber, setCardNumber ] = useState('');
	const [ postalCode, setPostalCode ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ mmyy, setMMYY ] = useState('');
	const [ cvv, setCvv ] = useState('');
	const [ countryy, setCountry ] = useState('');
	const navigate = useNavigate()
    
	let subTotal = 0;
	
	(usr?.userCheckOut || []).forEach((element) => {
		let cnt = element.count * element.elem.prodcutPrice;
		subTotal += cnt;
	});
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		
		let user = JSON.parse(localStorage.getItem('user'));
		setUsr(user)
		setName(user.name)
		setSurname(user.surname)
		setEmail(user.email)
		setCardNumber(user?.cardNumber || '')
		setPhoneNumber(user?.phoneNumber || '')
		setMMYY(user?.mmyy || '')
		setCvv(user?.cvv || '')
		setPostalCode(user?.postalCode || '')
		setCountry(user?.country || '')
        axios.get('http://localhost:3000/products').then(res=> setProduct(res.data.data))
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
	
    function productStock() {
        product.forEach((element)=>{
            usr.userCheckOut.forEach((ele)=>{
                
                    if (element._id===ele.elem._id) {
                        let stockCounter = element.productStock - ele.count
                        axios.put(`http://localhost:3000/products/${element._id}`,{
                            productImages:element.productImages,
                            productName: element.productName,
                            prodcutPrice: element.prodcutPrice,
                            productStock: stockCounter,
                            img_url : element.img_url,
                            discontinued: stockCounter===0? false:true,
                            productRatings:element.productRatings,
                            sale: element.sale,
                            brand: element.brand,
                            productInfo:element.productInfo,
                            productSize:element.productSize,
                            gender:element.gender,
                            type:element.type,
                            productColor:element.productColor
                        })
                    }
                
            })
    
        })
    }

	return (
		<div className="shop-check">
			<div className={black} />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		
            {
                count===0?			<div className="shoping-empty">
				<h3>Shopping Cart</h3>
				<div className="empty">
					<BsHandbag className="empty-icon" />
					<p>You have no items in your shopping cart.</p>
					<button>
						<Link to={'/'}>CONTINUE SHOPPING</Link>
					</button>
				</div>
			</div>:	<div className="shipping">
				<div className="container">
					<div className="progress">
						<div className="percent" />
					</div>
					<div className="steps">
						<div className="step" id="0">
							<BsCheck />
						</div>
						<div className="step-2" id="1">
							2
						</div>
					</div>
				</div>
				<div className="payment-flex">
					<div className="shiping-paymant">
						<h4>SHIPPING ADDRESS</h4>
						<hr />
						<Formik
							initialValues={{
								name: namee,
								surname: surnamee,
								cardNumber: cardNumber,
                                email:emaill,
                                phone:phoneNumber,
								my: mmyy,
								cvv: cvv,
								country: countryy,
                                postalCode:postalCode,
								promoCode: ''
							}}
                            // validationSchema={paymentSchema}
							onSubmit={(values) => {
								
								const userrr = {
									_id:usr._id,
									name:usr.name,
									surname:usr.surname,
									email:usr.email,
									gender:usr.gender,
									password:usr.password,
									role:usr.role,
									options:usr.options,
									src:usr.src,
									userCheckOut:[],
									userWishlist: [...usr.userWishlist ],
									userCard: [...usr.userCard , ...usr.userCheckOut ],
									country:countryy,
									mmyy:mmyy,
									cvv:cvv,
									postalCode:postalCode,
									cardNumber:cardNumber,
									phoneNumber:phoneNumber
								}
								axios.put(`http://localhost:3000/users/${usr._id}`,userrr).then(res=> {
									if (res.status===200) {
										console.log(res);
										productStock()
								localStorage.setItem('user', JSON.stringify(userrr))
								navigate('/profile')
								window.location.reload()
									}
								}).catch(error=>{
									console.log(error);
									toast.error(`${error.response.data.message}`, {
										position: 'bottom-right',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark'
									});
								})
							}}
						>
							{({ errors, touched }) => (
								<Form className="payment-form">
									<div className="payment-name">
										<div className="name-pym">
											<label>
												NAME <span>*</span>
											</label>
											<Field  name="name" required type="text" value={namee} onChange={(e)=> setName(e.target.value)}/>
                                          
										</div>
										<div>
											<label>
												LASTNAME<span>*</span>
											</label>
											<Field required name="surname" type="text" value={surnamee} onChange={(e)=> setSurname(e.target.value)}/>
										</div>
									</div>
									<div className="payment-form-group">
										<label>
											CARD NUMBER<span>*</span>
										</label>
										<Field required name="cardNumber" type="number" className="nmbr" value={cardNumber} onChange={(e)=> setCardNumber(e.target.value)}/>
									</div>
                                    <div className='payment-form-email'>
                                        <div className='email-pym'>
                                            <label>EMAIL <span>*</span></label>
                                            <Field required placeholder={errors.email && touched.email ? errors.email : ''} name='email' type='email' value={emaill} onChange={(e)=> setEmail(e.target.value)}/>
                                        </div>
                                        <div>
                                            <label>PHONE NUMBER<span>*</span></label>
                                            <Field required  name='phone' type='number' className='nmbr' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
                                        </div>
                                    </div>
									<div className="payment-info">
										<div className="postal-code">
											<label>
												POSTAL CODE<span>*</span>
											</label>
											<Field required name="postalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}/>
										</div>
										<div className="monthYear">
                                            <div>
                                            <Field required className="my"  name="my" value={mmyy} onChange={(e)=> setMMYY(e.target.value)}/>
                                            </div>
										
                                            <div>
                                            <Field required  className="cvv nmbr"  name="cvv" type="number" value={cvv} onChange={(e)=> setCvv(e.target.value)}/>
                                            </div>
										
										</div>
									</div>
									<div className="payment-prome-country">
										<div className="payment-country">
											<label>
												COUNTRY<span>*</span>
											</label>
											<Field required  as="select" name='country' value={countryy} onChange={(e)=> setCountry(e.target.value)}>
												<option value="Afghanistan">Afghanistan</option>
												<option value="Albania">Albania</option>
												<option value="Algeria">Algeria</option>
												<option value="American Samoa">American Samoa</option>
												<option value="Andorra">Andorra</option>
												<option value="Angola">Angola</option>
												<option value="Anguilla">Anguilla</option>
												<option value="Antartica">Antarctica</option>
												<option value="Antigua and Barbuda">Antigua and Barbuda</option>
												<option value="Argentina">Argentina</option>
												<option value="Armenia">Armenia</option>
												<option value="Aruba">Aruba</option>
												<option value="Australia">Australia</option>
												<option value="Austria">Austria</option>
												<option value="Azerbaijan">
													Azerbaijan
												</option>
												<option value="Bahamas">Bahamas</option>
												<option value="Bahrain">Bahrain</option>
												<option value="Bangladesh">Bangladesh</option>
												<option value="Barbados">Barbados</option>
												<option value="Belarus">Belarus</option>
												<option value="Belgium">Belgium</option>
												<option value="Belize">Belize</option>
												<option value="Benin">Benin</option>
												<option value="Bermuda">Bermuda</option>
												<option value="Bhutan">Bhutan</option>
												<option value="Bolivia">Bolivia</option>
												<option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
												<option value="Botswana">Botswana</option>
												<option value="Bouvet Island">Bouvet Island</option>
												<option value="Brazil">Brazil</option>
												<option value="British Indian Ocean Territory">
													British Indian Ocean Territory
												</option>
												<option value="Brunei Darussalam">Brunei Darussalam</option>
												<option value="Bulgaria">Bulgaria</option>
												<option value="Burkina Faso">Burkina Faso</option>
												<option value="Burundi">Burundi</option>
												<option value="Cambodia">Cambodia</option>
												<option value="Cameroon">Cameroon</option>
												<option value="Canada">Canada</option>
												<option value="Cape Verde">Cape Verde</option>
												<option value="Cayman Islands">Cayman Islands</option>
												<option value="Central African Republic">
													Central African Republic
												</option>
												<option value="Chad">Chad</option>
												<option value="Chile">Chile</option>
												<option value="China">China</option>
												<option value="Christmas Island">Christmas Island</option>
												<option value="Cocos Islands">Cocos (Keeling) Islands</option>
												<option value="Colombia">Colombia</option>
												<option value="Comoros">Comoros</option>
												<option value="Congo">Congo</option>
												<option value="Congo">Congo, the Democratic Republic of the</option>
												<option value="Cook Islands">Cook Islands</option>
												<option value="Costa Rica">Costa Rica</option>
												<option value="Cota D'Ivoire">Cote d'Ivoire</option>
												<option value="Croatia">Croatia (Hrvatska)</option>
												<option value="Cuba">Cuba</option>
												<option value="Cyprus">Cyprus</option>
												<option value="Czech Republic">Czech Republic</option>
												<option value="Denmark">Denmark</option>
												<option value="Djibouti">Djibouti</option>
												<option value="Dominica">Dominica</option>
												<option value="Dominican Republic">Dominican Republic</option>
												<option value="East Timor">East Timor</option>
												<option value="Ecuador">Ecuador</option>
												<option value="Egypt">Egypt</option>
												<option value="El Salvador">El Salvador</option>
												<option value="Equatorial Guinea">Equatorial Guinea</option>
												<option value="Eritrea">Eritrea</option>
												<option value="Estonia">Estonia</option>
												<option value="Ethiopia">Ethiopia</option>
												<option value="Falkland Islands">Falkland Islands (Malvinas)</option>
												<option value="Faroe Islands">Faroe Islands</option>
												<option value="Fiji">Fiji</option>
												<option value="Finland">Finland</option>
												<option value="France">France</option>
												<option value="France Metropolitan">France, Metropolitan</option>
												<option value="French Guiana">French Guiana</option>
												<option value="French Polynesia">French Polynesia</option>
												<option value="French Southern Territories">
													French Southern Territories
												</option>
												<option value="Gabon">Gabon</option>
												<option value="Gambia">Gambia</option>
												<option value="Georgia">Georgia</option>
												<option value="Germany">Germany</option>
												<option value="Ghana">Ghana</option>
												<option value="Gibraltar">Gibraltar</option>
												<option value="Greece">Greece</option>
												<option value="Greenland">Greenland</option>
												<option value="Grenada">Grenada</option>
												<option value="Guadeloupe">Guadeloupe</option>
												<option value="Guam">Guam</option>
												<option value="Guatemala">Guatemala</option>
												<option value="Guinea">Guinea</option>
												<option value="Guinea-Bissau">Guinea-Bissau</option>
												<option value="Guyana">Guyana</option>
												<option value="Haiti">Haiti</option>
												<option value="Heard and McDonald Islands">
													Heard and Mc Donald Islands
												</option>
												<option value="Holy See">Holy See (Vatican City State)</option>
												<option value="Honduras">Honduras</option>
												<option value="Hong Kong">Hong Kong</option>
												<option value="Hungary">Hungary</option>
												<option value="Iceland">Iceland</option>
												<option value="India">India</option>
												<option value="Indonesia">Indonesia</option>
												<option value="Iran">Iran (Islamic Republic of)</option>
												<option value="Iraq">Iraq</option>
												<option value="Ireland">Ireland</option>
												<option value="Israel">Israel</option>
												<option value="Italy">Italy</option>
												<option value="Jamaica">Jamaica</option>
												<option value="Japan">Japan</option>
												<option value="Jordan">Jordan</option>
												<option value="Kazakhstan">Kazakhstan</option>
												<option value="Kenya">Kenya</option>
												<option value="Kiribati">Kiribati</option>
												<option value="Democratic People's Republic of Korea">
													Korea, Democratic People's Republic of
												</option>
												<option value="Korea">Korea, Republic of</option>
												<option value="Kuwait">Kuwait</option>
												<option value="Kyrgyzstan">Kyrgyzstan</option>
												<option value="Lao">Lao People's Democratic Republic</option>
												<option value="Latvia">Latvia</option>
												<option value="Lebanon">Lebanon</option>
												<option value="Lesotho">Lesotho</option>
												<option value="Liberia">Liberia</option>
												<option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
												<option value="Liechtenstein">Liechtenstein</option>
												<option value="Lithuania">Lithuania</option>
												<option value="Luxembourg">Luxembourg</option>
												<option value="Macau">Macau</option>
												<option value="Macedonia">
													Macedonia, The Former Yugoslav Republic of
												</option>
												<option value="Madagascar">Madagascar</option>
												<option value="Malawi">Malawi</option>
												<option value="Malaysia">Malaysia</option>
												<option value="Maldives">Maldives</option>
												<option value="Mali">Mali</option>
												<option value="Malta">Malta</option>
												<option value="Marshall Islands">Marshall Islands</option>
												<option value="Martinique">Martinique</option>
												<option value="Mauritania">Mauritania</option>
												<option value="Mauritius">Mauritius</option>
												<option value="Mayotte">Mayotte</option>
												<option value="Mexico">Mexico</option>
												<option value="Micronesia">Micronesia, Federated States of</option>
												<option value="Moldova">Moldova, Republic of</option>
												<option value="Monaco">Monaco</option>
												<option value="Mongolia">Mongolia</option>
												<option value="Montserrat">Montserrat</option>
												<option value="Morocco">Morocco</option>
												<option value="Mozambique">Mozambique</option>
												<option value="Myanmar">Myanmar</option>
												<option value="Namibia">Namibia</option>
												<option value="Nauru">Nauru</option>
												<option value="Nepal">Nepal</option>
												<option value="Netherlands">Netherlands</option>
												<option value="Netherlands Antilles">Netherlands Antilles</option>
												<option value="New Caledonia">New Caledonia</option>
												<option value="New Zealand">New Zealand</option>
												<option value="Nicaragua">Nicaragua</option>
												<option value="Niger">Niger</option>
												<option value="Nigeria">Nigeria</option>
												<option value="Niue">Niue</option>
												<option value="Norfolk Island">Norfolk Island</option>
												<option value="Northern Mariana Islands">
													Northern Mariana Islands
												</option>
												<option value="Norway">Norway</option>
												<option value="Oman">Oman</option>
												<option value="Pakistan">Pakistan</option>
												<option value="Palau">Palau</option>
												<option value="Panama">Panama</option>
												<option value="Papua New Guinea">Papua New Guinea</option>
												<option value="Paraguay">Paraguay</option>
												<option value="Peru">Peru</option>
												<option value="Philippines">Philippines</option>
												<option value="Pitcairn">Pitcairn</option>
												<option value="Poland">Poland</option>
												<option value="Portugal">Portugal</option>
												<option value="Puerto Rico">Puerto Rico</option>
												<option value="Qatar">Qatar</option>
												<option value="Reunion">Reunion</option>
												<option value="Romania">Romania</option>
												<option value="Russia">Russian Federation</option>
												<option value="Rwanda">Rwanda</option>
												<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
												<option value="Saint LUCIA">Saint LUCIA</option>
												<option value="Saint Vincent">Saint Vincent and the Grenadines</option>
												<option value="Samoa">Samoa</option>
												<option value="San Marino">San Marino</option>
												<option value="Sao Tome and Principe">Sao Tome and Principe</option>
												<option value="Saudi Arabia">Saudi Arabia</option>
												<option value="Senegal">Senegal</option>
												<option value="Seychelles">Seychelles</option>
												<option value="Sierra">Sierra Leone</option>
												<option value="Singapore">Singapore</option>
												<option value="Slovakia">Slovakia (Slovak Republic)</option>
												<option value="Slovenia">Slovenia</option>
												<option value="Solomon Islands">Solomon Islands</option>
												<option value="Somalia">Somalia</option>
												<option value="South Africa">South Africa</option>
												<option value="South Georgia">
													South Georgia and the South Sandwich Islands
												</option>
												<option value="Span">Spain</option>
												<option value="SriLanka">Sri Lanka</option>
												<option value="St. Helena">St. Helena</option>
												<option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
												<option value="Sudan">Sudan</option>
												<option value="Suriname">Suriname</option>
												<option value="Svalbard">Svalbard and Jan Mayen Islands</option>
												<option value="Swaziland">Swaziland</option>
												<option value="Sweden">Sweden</option>
												<option value="Switzerland">Switzerland</option>
												<option value="Syria">Syrian Arab Republic</option>
												<option value="Taiwan">Taiwan, Province of China</option>
												<option value="Tajikistan">Tajikistan</option>
												<option value="Tanzania">Tanzania, United Republic of</option>
												<option value="Thailand">Thailand</option>
												<option value="Togo">Togo</option>
												<option value="Tokelau">Tokelau</option>
												<option value="Tonga">Tonga</option>
												<option value="Trinidad and Tobago">Trinidad and Tobago</option>
												<option value="Tunisia">Tunisia</option>
												<option value="Turkey">Turkey</option>
												<option value="Turkmenistan">Turkmenistan</option>
												<option value="Turks and Caicos">Turks and Caicos Islands</option>
												<option value="Tuvalu">Tuvalu</option>
												<option value="Uganda">Uganda</option>
												<option value="Ukraine">Ukraine</option>
												<option value="United Arab Emirates">United Arab Emirates</option>
												<option value="United Kingdom">United Kingdom</option>
												<option value="United States">United States</option>
												<option value="United States Minor Outlying Islands">
													United States Minor Outlying Islands
												</option>
												<option value="Uruguay">Uruguay</option>
												<option value="Uzbekistan">Uzbekistan</option>
												<option value="Vanuatu">Vanuatu</option>
												<option value="Venezuela">Venezuela</option>
												<option value="Vietnam">Viet Nam</option>
												<option value="Virgin Islands (British)">
													Virgin Islands (British)
												</option>
												<option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
												<option value="Wallis and Futana Islands">
													Wallis and Futuna Islands
												</option>
												<option value="Western Sahara">Western Sahara</option>
												<option value="Yemen">Yemen</option>
												<option value="Serbia">Serbia</option>
												<option value="Zambia">Zambia</option>
												<option value="Zimbabwe">Zimbabwe</option>
											</Field>
										</div>

										<div className="promoCode">
											<label>
												PROMO CODE
											</label>
											<Field name="promoCode" />
										</div>
									</div>
									<button className="buy" type='submit'>BUY PRODUCT</button>
								</Form>
							)}
						</Formik>
					</div>
					<div className="payment-products-card" style={{ height: arrow? '400px': '120px'}}>
						<h4 className="summary-title">ORDER SUMMARY</h4>
						<div className="itemsCard">
							<p>{count} Items in Cart</p>
                            {
                                arrow?<FiChevronUp onClick={()=> setArrow(false)}/>: <FiChevronDown onClick={()=> setArrow(true)}/>
                            }
							
						</div>
						
						<hr />
                        {
                            arrow?<div className="payment-products">
                            {(usr?.userCheckOut || []).map((element, index) => (
                                <div className="payment-product" key={index}>
                                     <img src={element.elem.img_url} />
                                     <div className='product-name-count'>
                                        <h5>{element.elem.productName}</h5>
                                        <p>Count: {element.count}</p>
                                     </div>
                                     <p className='payment-product-price'>${element.elem.prodcutPrice}.00</p>
                                </div>
                            ))}
						<div className='subTotal-checkout'>
								<h5>SubTotal</h5>
							<p>${subTotal}.00</p>
							</div>
							
                            </div>:null
                        }
						
					</div>
				</div>
			</div>
            }

		
		</div>
	);
}

export default CheckOut;
