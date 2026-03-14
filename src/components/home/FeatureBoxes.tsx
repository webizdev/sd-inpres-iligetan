export default function FeatureBoxes() {
  return (
    <div className="container mx-auto px-4 relative z-10 -mt-24 md:-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 shadow-xl">
        {/* Box 1 */}
        <div className="bg-brand-green text-white p-8 hover:brightness-110 transition-all">
          <h3 className="text-xl font-bold mb-4 uppercase">SEKOLAH BERBASIS KOMUNITAS</h3>
          <p className="text-sm leading-relaxed text-green-50">
            SD Inpres Iligetan merupakan salah satu sekolah berbasis komunitas yang ada di wilayah kami. Tentang Pendidikan Berbasis KOMUNITAS adalah sebagai konsep dimana pendidikan dikelola oleh komunitas.
          </p>
        </div>
        
        {/* Box 2 */}
        <div className="bg-brand-orange text-white p-8 hover:brightness-110 transition-all">
          <h3 className="text-xl font-bold mb-4 uppercase">BERPRESTASI</h3>
          <p className="text-sm leading-relaxed text-orange-50">
            SD Inpres Iligetan selalu ingin menciptakan SDM atau lulusan yang berprestasi dalam berbagai bidang. Baik itu di bidang akademik maupun minat perseorangan seperti olahraga, kesenian dan lainnya.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-brand-blue text-white p-8 hover:brightness-110 transition-all">
          <h3 className="text-xl font-bold mb-4 uppercase">BERDAYA SAING</h3>
          <p className="text-sm leading-relaxed text-blue-50">
            Perkembangan zaman yang sangat maju ini membuat setiap orang harus memiliki daya saing yang tinggi untuk mencapai impiannya. Maka dari itu kami ingin menciptakan SDM yang berdaya saing tinggi.
          </p>
        </div>
      </div>
    </div>
  );
}
