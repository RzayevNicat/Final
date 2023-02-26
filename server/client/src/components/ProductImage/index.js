import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuick } from '../../context/QuickView';
import { Carousel } from 'react-responsive-carousel';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../pages/Product/Product.css';
export function Gallery() {
	const { saleProduct } = useQuick();
	const [ preview, setPreview ] = useState({});

	const { id } = useParams();
	useEffect(() => {
		axios.get(`http://localhost:3000/products/${id}`).then((res) => setPreview(res.data.data));
	}, []);

	return (
		<Carousel>
			{(preview.productImages || []).map((ele, index) => (
				<div key={index}>
					<img src={ele} className="imggg" />
				</div>
			))}
		</Carousel>
	);
}
