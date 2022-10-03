import { useRouter } from "next/router";

const ProductDetail = () => {
    const router = useRouter();
    const routerId = router.query.productId;
    return <h1>Details about product {routerId} </h1>
}

export default ProductDetail;