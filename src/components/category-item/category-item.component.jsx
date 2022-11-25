import { useNavigate} from 'react-router-dom'


import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './category-item.styles';

import './category-item.styles.jsx'

const CategoryItem = ({category}) => {
	const {imageUrl, title} = category;
	const navigate = useNavigate();
	const onNavigatehandler = ()=> navigate(`shop/${title}`)
	return (

		<DirectoryItemContainer onClick= {onNavigatehandler}>
		     <BackgroundImage imageUrl={imageUrl} />
		     <Body>
		     
		       <h2>{title}</h2>
		       <p>Shop Now</p>
		       
		     </Body>
		   </DirectoryItemContainer>
		
		)
	

}

export default CategoryItem