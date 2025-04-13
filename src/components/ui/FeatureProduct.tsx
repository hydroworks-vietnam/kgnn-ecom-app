import { Button } from "../Button/Rectangular";

interface FeatureProductProps {
  color: string,
  text: string
}

const FeatureProduct = ({color, text}: FeatureProductProps) => {
  return (
    <section className="flex justify-center py-4 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[1060px]">
        <div className="relative flex-1 mb-8 md:mb-0">
          <img
            className="absolute w-full max-w-[481px] h-auto top-[21px] left-0"
            alt="Ellipse"
            src="https://c.animaapp.com/m8dwba22KFnkpc/img/ellipse-63.svg"
          />
          <img
            className="relative w-full max-w-[509px] h-auto ml-0 md:ml-[49px] object-cover"
            alt="Home stylish club"
            src="https://c.animaapp.com/m8dwba22KFnkpc/img/home-stylish-club-sofa-chair-pleated-sofa-armchair-with-golden-l.png"
          />
        </div>

        <div className="flex-1 pt-4 md:pt-[82px]">
          <h2 className="font-['Josefin_Sans',Helvetica] font-bold text-text text-2xl md:text-[35px] tracking-[0.53px] leading-tight md:leading-[46.2px] mb-8 md:mb-[75px]">
            Unique Features Of leatest &amp;
            <br />
            Trending Poducts
          </h2>

          <div className="space-y-4 md:space-y-[25px]">
              <div className="flex items-start gap-3">
                <div
                  className="w-[11px] h-[11px] rounded-[5.5px] mt-1.5"
                  style={{ backgroundColor: color }}
                />
                <p className="font-['Lato',Helvetica] font-medium text-[#acabc3] text-base tracking-[0.24px] leading-7">
                  {text}
                </p>
              </div>
            )
          </div>

          <div className="mt-8 md:mt-[48px]">
            <Button className="w-full sm:w-[157px] h-[45px] bg-app-accent rounded-sm hover:bg-app-accent/90">
              <span className="font-['Josefin_Sans',Helvetica] font-semibold text-white text-[17px] tracking-[0.34px]">
                Add To Cart
              </span>
            </Button>
          </div>

          <div className="mt-4 md:mt-[6px]">
            <h3 className="font-['Josefin_Sans',Helvetica] font-semibold text-text text-sm tracking-[0.28px]">
              B&amp;B Italian Sofa
            </h3>
            <p className="font-['Lato',Helvetica] font-normal text-text text-sm">
              $32.00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureProduct