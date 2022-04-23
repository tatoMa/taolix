import { render, screen } from '@testing-library/react'
import About from '../pages/about'

describe(' "About" page test, when the "About" page loads =>', () => {
  beforeEach(()=>{
    render(<About/>)
  })

  describe('title =>',() => {

    const title ='TAOLIX';

    it('expect the title to be focused',()=>{
      expect(screen.getByText(title)).toHaveFocus();
    });

    it('expect title to render and be in the document',()=>{
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  })


  it('expect sub title to render and be in the document',()=>{
    const subTitle ='A blazing fast online video streaming service.';
    expect(screen.getByText(subTitle)).toBeInTheDocument();
  });

  it('expect the introduction to render and be in the document',()=>{
    const intro ='TAOLIX is a open source project that focus on the user experiences with blazing fast browsing speed and free for all contents.';
    expect(screen.getByText(intro)).toBeInTheDocument();
  });

  it('expect title to render and be in the document',()=>{
    const disclaimerVideoSource ='All videos on TAOLIX are NOT hosted on TAOLIX server. We only collect links and information from the Internet. Every videos on TAOLIX are links to 3rd party. We do not provides any video from our end.';
    expect(screen.getByText(disclaimerVideoSource)).toBeInTheDocument();
  });

  it('expect title to render and be in the document',()=>{
    const disclaimerDelete ='If you find any video are violated to your privacy please contact us. I will remove it as fast as possible.';
    expect(screen.getByText(disclaimerDelete)).toBeInTheDocument();
  });

})