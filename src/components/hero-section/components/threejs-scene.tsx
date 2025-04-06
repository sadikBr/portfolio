
import BrahimImage from '../../../assets/brahim.jpg';

export default function HeroSection3dScene() {
  return (
    <div className='relative w-full h-full'>
      <img src={BrahimImage} alt='profile image' className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30%] rounded-full skew-x-12' />
      <iframe src='https://my.spline.design/chips-f7c7256f9d337b5a24830255ad24d8b2/' width='100%' height='100%'></iframe>
    </div>
  );
}

