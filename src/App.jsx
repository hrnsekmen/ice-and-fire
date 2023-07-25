import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHouses } from "./app/apiSlice";
import Layout from "./components/layout/Layout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHouses({ page: 1, pageSize: 8 }));
  }, []);
  return (
    <Layout>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eaque
      eveniet facilis adipisci necessitatibus eligendi eos doloremque ratione
      alias itaque ullam molestiae ipsam nulla perspiciatis amet explicabo eius
      excepturi velit, molestias voluptatum laudantium quam? Repellat
      laboriosam, provident quidem repudiandae voluptatibus quo sapiente veniam
      modi, molestias, ea similique. Modi eaque ipsam sed consectetur dicta
      accusantium sint architecto dolorem, doloremque animi illo odio eius!
      Animi nihil voluptatum dolores labore doloribus iste perspiciatis. Minima,
      ratione pariatur molestias natus deserunt laudantium nostrum ipsum sed.
      Dolorum neque ea consequuntur culpa fugit accusamus ipsa obcaecati quasi
      repellendus mollitia voluptate magni, rerum similique quos illo eaque
      perspiciatis asperiores odio molestiae hic aliquid amet quis qui!
      Voluptatem, totam vero unde sed perspiciatis, quisquam quod debitis fugiat
      officiis repellendus nobis sunt consectetur atque ipsum? Animi, sequi.
      Voluptates minus sit laborum quas enim pariatur fuga numquam nam quos
      corrupti excepturi aperiam blanditiis quae, temporibus ratione repudiandae
      deleniti vel aut natus amet non rem tempora! Inventore perspiciatis
      blanditiis excepturi, ipsam animi veniam consequuntur eveniet temporibus
      magnam debitis aperiam corrupti, quos dolor fugit facilis obcaecati
      laudantium. Ipsum dicta sit ratione pariatur itaque, accusantium molestias
      quia commodi optio et possimus culpa enim beatae incidunt minima
      aspernatur quis vel tempore inventore non repellendus fugit.
    </Layout>
  );
}
export default App;
