import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import {CompaniesList} from '../store/Companies';
import {globalStyles} from '../styles/global';

export default function Companies() {
  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Header />
            <View style={globalStyles.container}>
              <FlatList
                data={CompaniesList}
                renderItem={({item}) => (
                  <View style={[globalStyles.card, globalStyles.container]}>
                    <View
                      style={[
                        globalStyles.titleContainer,
                        {backgroundColor: item.color},
                      ]}>
                      <Text style={globalStyles.companyTitle}>{item.name}</Text>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <Image
                          style={globalStyles.image}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default function CompaniesPage() {
//   const Companies = [
//     {
//       key: '1',
//       name: 'LIVROS E PRODUÇÃO CONTEÚDO',
//       image:
//         'https://recrutamento.ganbatte.com.br/wp-content/themes/tema-ganbatte-recrutamento/images/clientes/logo-piraporando.png',
//       color: '#b45f06',
//     },
//     {
//       key: '2',
//       name: 'NOVAS PROPOSTAS DE ENSINO',
//       image:
//         'https://media.licdn.com/dms/image/C4D0BAQGPyjyK9so-Aw/company-logo_200_200/0?e=2159024400&v=beta&t=XaLCqLypxgydL9vBG53h65dN7aFrbkLNRgjbccLFdt0',
//       color: '#3d85c6',
//     },
//     {
//       key: '3',
//       name: 'JUDO',
//       image:
//         'https://static1.squarespace.com/static/5c179b3829711462bb0d8eee/t/5c17a5f3f950b7d4a3790b3a/1559565687639/?format=1500w',
//       color: '#134f5c',
//     },
//     {
//       key: '4',
//       name: 'TREINAMENTO PROFESSORES',
//       image:
//         'https://static.wixstatic.com/media/9edf24_ce524471f03548e5ac1aead3a2b4dacb~mv2.png/v1/fill/w_196,h_51,al_c,q_80,usm_0.66_1.00_0.01/logoBcoPt.webp',
//       color: '#a61c00',
//     },
//     {
//       key: '5',
//       name: 'MEDITAÇÃO',
//       image:
//         'http://www.mindkids.net/wp-content/uploads/2018/02/mindkids_final_azul02.png',
//       color: '#45818e',
//     },
//     {
//       key: '6',
//       name: 'BLOCKCHAIN',
//       image:
//         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAADeCAMAAAD4tEcNAAAA8FBMVEX///94d3jxlwBwb3BzcnN1dHXMzMz4+Pj8/Pxsa2zc3Nx5eHn09PSdnJ33mADu7u7V1dXzlADQtZiYgWR/gYLOyLynpqfwkADOzs6OjY7m5uZxdXuVlJXEw8SwsLDkrmiPhXO9vb387Nb74L+joqOurq6GhYbojgDh4OHxmgv1sluZmJnzpz362rP99ej40J6piWO+jk/75cnzqkfynyD2vnjTlD73xYf++/TGnGaCfnjGkU7DqIfnlyPaiAD1uWrVsoOYkYW4nHeOc1HviABpcn74pzN2cGm8j1XMmFSzqp3Bhjj0r0/W083PsYfIiStbPvo1AAAXXElEQVR4nO2df5/iNpKH7ZYMNoaGnvHQxgESEpohYSfZ2dvLZpPc5fZ+ZDdzmdv3/25OJVm2pKoy7h6mh+4P9UcyDbKtx/WVVCrJJooe14az//jykS/5yDYsZ9Hnt988Y8p0MEuj6PObm2dLCT4E+/zm6urm9vdnSKkIU/MvYATK5+bL4cASWsbnRmlVaswyPifF+oQu43OhdFVqzGV8DooNfQjmMz51X44JQsz4lCmxSo1hxqeqWEXIfEMxPkVKqh1aoxmfnGK/+tuU/5JjVJRX/0nL+/zsqz/cfiHuxtzXHOP11dsfi6gsH7OqD7Svfr29uv4ikdkd40ua8frrt/lnSWEnJ+dsyodQ4S/iOJbJnPQlxagJ1TEFFGjD93M0Q1gzKkpJKRYzgko/00cUpsjwbBULKr1yGRUlodiQ0frQYTxXxbaEDiP4MlSsz+gSOoyPp9hR75JWpYgRK9ZlbFWKGO+n2B96l/QsLcuff/1Tr6KuDxFjqNiW0fchYuyv2Ddf/9e8Y0TmLJ2VafTi9vYPxylDQsToK9YyYkLE2E+xb/58e/1SintTlrOh+u8LVZ3bf+mm9FXKMLqUhlER/hgSEoxasZ2UilCd7eVnsaJk4w5sqT3tC12dLl9iHzKMrWKBkfIhw+hUhyM0jHCFvr7UKo0cRp6SJmQYtS+nwMgRMoxASSv2zdf19Q2juoLY9qBMjUp9RlqxlEo7GY1iP7+iVNrJSE9k3rR32DIC5TFfBrJ44XTzyJe//zc7gWAZ41hkb3/8H/ZbljGKxlvflbVKQ8ZjinVUihkx5YP8eAd+ZJTa6Ud/rGxUihm7fOmplGLEin289ujffM+HmJGjJDuvkJHw5WP0q4MjhJiRokQq5Rj7KfZjjo+BSjnGkFIRhirlGfso9pRxzlEfcoweJT/E0ozHFfux4lWGkGOMbezTFdxzjIry1z95ru+cd8xPMu9I31xx/TjLCPd3Mo6mg+r+jMoDfx+VLOXHmD+WxeCvr9n6cIyJ2A3gNNWKo2QYr6/+8eNnQjXjgVcLMg+A+/AH5QHKnRDjaMRRMoyJyBspVIwvSca6TkJfmvalzeeQM4EH5HPKQiSxgLvFUJKMiSi809CUBGNz14W53zOK0uTlkEo5xiN5OeXDBC5oFEFSEoxKpainoRSLGLVKzTlEXYZSLORX2XjqnvnVmrBhJCkRY+jDhnKw72b0+gfRFisHoS+/6Jiv3itPrlUa+4wEZcDIEWrKwJceYzCaOYygWA/pVOsdDqHHiCg9RkqlPKXD6KgUM2rFur48ybpVo1KCMaB0GCkfDgJRub1Pw3j99T/CuEsE5wkU+8Hrj4PCI0SMHmXDSBDOymiClpimjS9rRnKWgBjhbO6ZPmgduQwJCUaHsmbEKoUecRRtE5mElFaxmhGplGUMFfvg/QCDHSIkGRtKzUj6cAyZ8G0Cg/UaKXZvGAmV8owRUuxD9nUglXYw1pSKkSI0dTGMQIkVu1eM7IydYzyu2CP7c8qcJGQZNeX1y4xQaX23LSO1kFYNfv6JzaDxjFE6Grh/3mef1ZDxYScjUL7EKm301DKSvtwk4v6M0fvfFt5qUN/9ctPBu//tuKkdjGVQcS+OdhkpymiTM5Qs4/ufXl8X2c6n7LHvcToYRa9urljp8Fpd+ZUOer6AkVJsuqIpGcb3v72+vrouVCeHfNm5f3W6guKK8Zqj5Pqcgf95SIgZtS+DMimpWJJx9tZ05YUqkGS0Yql9yIZQM8Jg9VNBDVYU4ywgDGd7NKNOv4SKJXxJML7/6bYekgtdJAkUy+0nB5VGLaM6/prwJRUDYJUSYQfF2E+xiFGr9MpljCnFoucCWsKG8YpSLI7lBt3tsJtRUx5RbMA4+80NkYumWEg5Lv3nO8Yr9+tX7iQgUGwYk/dQaTfjccV6jI1KEaNWLDsJcX0YMCJf+nOrcCpBqvQYYxxn8t23fmlXsQ7j+7eNSglG7EuOMGAMKN05ckj45d/45GKXH9VU/sXtvyJKq9iG0VMpyUhT+iolGT3FtrmOUKVffnPzkkkedTGalNoL1QWGlFaxNaMa8YkUUsioRxJPsdiHJKPjS5uzQj785vbm+mXHsmN3vwpzq5sb7Eug1Izv39KpQMzo+5ImJBkbSpN7pAjruZVZ+uvHqKKAuqyZI1OUsRB6tGBSuhRjS0mptIOxpoQcMlap6evqOTKd7qTinLbciya0xIpNSJV2MhrFTkt++xbDqCn/PqB96DDSG/S649U2Z4V9Of6uY4mFY1SQy92G32/DMl7d/vlNSPh7O145OSuc2A3mHdK/C27uEVP+8N0VlyplGBOx3EeTLGcpOUZFGJRsfRgw4nbZPX/0c8hYsRwlzah8CAmUSRKLmKGkGY8Rohyy38d25QHwWgD2ZfQduXRNMCofmnF6ohcvkg0VeVGMt78iwt9vg3JoLcBVbJPPIbcM4zWdforFjFqlUcuoKCnFYsbjPiQZXcXWeTkcmzKMjGLDrSQBo1Jp25dOmgUMrNiQsR8hszZnRwidXyV9yDGSI0mgWJ+xUWnAqChlQOkz9lFpB6NVrGLseBSDWys/pliX0VEpYkSKdRn7+rCD0UQFirEjYuf3PNzc/F8wkruKbRnrvpRl1JQUIybc/7Vjgx675yHOsjLM+fZivL7+/otsiGLORrGWMVApyegp1jJilVaHbPrqe3aDHu/Htem/Z2GQ1M0IhJ9BTD4OKX+oKQ0jUinD6CjWMBKEE5GomDxVlNdklZj2mDhrHEwmhGI0hPW8A80fTLsERhWaUoQkY6NYYMQqnU4gea7nHcNX/yQ36NH9arCKQyoWM1rCZv6IfBmpdnldEO2wk7FW7KtbTFhNMn1EPX9MKcWS4+Ma+42gDBlbQicPgCjT767yA0fIMmpfviII7QJIkwcgFIvjnIQgBBuFivUZXUIvn4MVu+7orFnGROQrltDL5yDFhvEqWmt0LPCly+gTBnk55Msp2iNyjDERKH1nVYoYkWL9eYdgfEhStowhIcqvEpSML0lGYi9GdfCX6YL8qqdYd/7IqdQ91lGsZcSERJ4cKZahJBhJH4YLkShPrhSL9jx0qtS1Zrw0jBQhud6BfIl3NVGMR1XKMIIv/+nteTiqUo+ybPJyNCGzboUVi3eoBYw9VMoyNoo1ebkeKvWO1Yp9ccMRsuuPxxXrMfZSaQcjKPZ7VcuXMB7e43Gr2lTs84Il7FhHJhTrfeAw9lRpJ6NR7Mv7qNS10TuWsHM/wDAcHmGPSGMNI7Fj6P2BI+zcDxC9e/cwQl25rZD3Zqx+fl2EuVynXdaM2IfpbPbq9R8/Y4XDMnZtF+9j021GU3KM1c//fnNd4C3IjWI1I6FSWD98dXP9bxwlx9gRbvS26Zz0Jc0IhGbegXO5tWIVI+VDvX4I8w6OkmY8BaE+D6VYitEQ2vkjXmPRlBNJENZrwGb+SFNSjKci1OfCisWM05qwzQMQil1Vh4JSqTGbB6AoMaPXlZ3AkGJDxqohdPM5eFVwOvD/9vZitPkcTBkyntKHzTl9Sp/RJfTzctyqoLHguQI3LxdS+owfg1Cf11Wsyzj1CMP8ascD3+FeDD+/6lO6jKdWqWuOL1vGKiDEeXJ6HZvYMRTmyV3KlvFj+bA5/1xKjxETUusdPR+5xOsdLaVl/NiE+hpmJDGMoUo5RrSOTe8YotatLKVh/JgqdW06V+0SGCkfcoyuYpnHZrn1R0MJjI/hw5ZSZCwhv45sFMsS8uvIQJmNPzQuvTflhCXs2g+gKLvepcLvB7h+/cfN4xKCffkLt4rUsa9D5KslvbFMG8t4c/OXcD3wcezbX27utT8nFsVKx6ssJcN4c/WXB74E6AT2Le1LmlH5EFSq5x0MJcmofPjpCMFISmq/XJMEN/PHjKQkGD85IRihWGLfY9Gk+Zs8AEGJGD+pSl1DlCGjImz7UiefgygDxk/W01AWKNbfhxws1Xh5uYDSYzwLlbrm+dLbT14Ei1FBftWjdBjPRqWuOZQtIyIk8uQOZcN4loRgjWLt8x0iRoTkekdDWTPe3J4pIVhNaZ7TIXwIRq1b2UcHNOPZtcPQtGKBkSFk1x8X9fNWZ6tS18CXhYgH3PfsOrKifHV77j609u0vBUvYtR8g2717IoRg6KFLx/h9HfEDVtc+paGHFBpjGMn9NOdu3A41klFKcl/y+RvtS2q/XPwEfWiNokSMT1KlrmHFBoxPVqWuhb709yHH6zN8f/UDzKd0GJ+FD625im0YpXhGhGCtL+3zHc9Fpa5Zyq7ndJ6+GUrF+OxU6hpQTpQPn59KXRuVyyc+4vexB7z0/mIXu9jFLnaxi13sYhe72MUudrGLXexiF7vYU7Rhqm3oJ3bRB4T1KWLKqP96WdVheHr1Z2q+CLKv4QdpUE3n+xTVxn45bNbKds6+irSIRccGFHjQYlLkcZwv7rg98OlovVAl5Fr9eybivK3rVH0sts2f1WapTpUs1D/H6gtvK2Ql4qTNyO7nu1xdctN+MlDfm3/NFnHsvzczGok4M3eueYYqEUlTJi2SLsbRUohE35xEipxagUo3uZBQomZM4oZxnCcO4mBnyhnGJGTMYmmJpsvMlJRibq/YMK7hSeYkW7OMUoCpQpl9CrrTj0P9aHSijwJSIdFPZszgPa1JogpkoR+nLmKlf/4ATpXtItqPlhHuk64p/K+Y+oyzTB2pLpm5R7uMcjNTVk7glaPj44z7WMLq2nJTzmarua6kmPtF7jL9zPF8pYpUPqOHOBCwgz6fwKlG3YwjoCjuytlgq+5rko89xmUS56uB+nzJMNrTqgPk3VHGkaqXjNvVtf0B7s3BLaLvlvNOOYfRE+pK19t5bIdnHMOdrBvFdCmMtFtG5dpNFG2E9wihx2ibobpDRXqEsQJF+D+qOVM3Vkzav+fqwtJr/g2j70WFmG3ccjzjVlWz3Uk5kXWzahmhumOpUTsZ1Ydi2M04hEpugg/HhfvhSl0395enLKOHuAdv+z0hyzhVtXfbQ5EYR/qM0SFJnN9zIxnVGbNxN6O6gwixhqyfh1LVCREto9+jwjHB89cso2IR7u6QQV3TgFFdR7SP1pGMcES3H9W9lxPic9XH1y1E3Uv3Oi6j50VwNxYEx3gn7enrgvX9CRhTNc627iYZrQJ4RtV/JeQ6sGrumSabZmZIRIypjxip6uzCcizjJEn8rrswzTNgjNaKpukriH51ukiaAZJhHGdeo3YsTeoGA1dBdwEYKx8R2j56AT3LeEhkwJiQjEpPbb1dxmSxVAYDXSMIhjFsFo7dyVj3ybsk2aIvgVEhut/MZYJ/fvWDGeHyzRDpxTmJNgiT7HOUDOM28ZuFY3DCqfY0dg8w6o1Hzje7xI7FJ2VcmWoQjBJMQ446GRcJbmu2eqYXGLXBF2Z0GuAwjwX+WTjNmDq2bxhVe3S/YNojVKOpoqfV7WatbAmvOKhvNc2Y7hLBPNJgjyi9GYbLKHeJc041wqDeVzMqUbsWW8bgi5hhhN7JtgEqlhvOhX1GnWHsitQNv7pogachilFuYUDM7XdT0QyoASPah20Zw93LNCP0ZSOCsWkmEKIsuxm7/LgyfiQZlXdnzogIfqQZzSSoNtkyJu7ngmWEAXDSxQi9Y1axjNBR0ENH08AUR4J73jrOWbSj6xjFcfWnahJUtraRTXs8uJ/PuPboDl4MYypNk2UY4VIMI8SBlQ4BiHZWM46c+KCgRlog945m+9Ud06+aGqy6GKO5GV8YRnVbE4ZxZeJAFU0RdbcxuQqT7Ph6oIahDx87IlBLfWaOcSV0B88w7snRT5sdfCeqY2EZocpzeyFikDkJ48AOkRxj3S+mBT1K5AkOMi2FuQr8A6c+7IgyaeYnY93VfgzGoR0iOcaNNBBM7wKTBbJnVeNCbP4F2bpwhGznyKpOdYueyzqKPzUjvDtfj18c46LueSdM1KZYJPHiDGearkYPGXZMba7jrhn7VdSXhDfjNIw23GcYK+unlaD6R901JglqR3eiDeejg3TnFwHjsC2ppmPJzoc8DSP0DQeWMYV4S3+cQgWo7PBGQQb9TjoRTaIMzggT/INXeScvBxPN+nB9mCeKEzGq7h+6b5JxvGgzGaouckHNo3TA577UaFaoEcUV8FTNYWTudjwOo5poNt3WAg5098+fiHFshkhqjryBujWSgwokGzyH0MlTKbblVB0/3m92OhfpuWOaQ3RfbEb2Trg55I3T8S7hfiXzmb3KiRh1unWsO/GoZrQhIlRs0egzXYggeBR1orCE93bZ8FFNyZLsEPQdKbxG1STSUZ5ch+b23xub/BaiM09+T0aY50BCvT5o6LwZL/H7ii1673Kt4/HWrFHUB1G/gD6zvx6L13QG7vhTLevXubFrOg9hjA56wmo7iWHWuukQvCRkdMgoP0ag68J8lYkJE/jMtiJr/JgJ2bbgQn3admf7uzxr/Ki+CdZ0hI5ZllnmM+Yi04yZ0HIU5s/W5uqLbGFfEtaE8ntq+WnvRvul2+rSalbORp2PMkxH6mgYgabq2PbslfrLO24MV5nVlfH6uWFp3tI2MudpbWYqAyeGP8MzqnPOysd/AdbFLnaxi/W34b4czJiOaljNBgP3t4pR4dFgULJdMJQ2Bl3vakWkg+DV3yPiZyOrFTE0P9CqiQlrcvxw5nC10N+14xpReKtHwHxLvHDNloZTAF2GJpVqHgGD3zwYIcFWGT1jf4DdqSrKYpdDPYNqbqCGMt/tClu1O4ELz2Ve6A0Q6LXka1PamGYkUpILiGnuBF47GAhuaeK+thRioXfhqKhdZq46KkWSr/eucw+28HilCtcB1lysYbyeZDLzZ5ZN6cYyYtpaM2I/noxxItrwcrh0g61Sha1BRmQbFDZ+04yR/hknsRt7pcOMSkbkygo450bgtCf12UOs9K+6lE0evFROCH9RW2RUYcuob0vRQKowFiWHsgS5ayrMKgPO920J/T7Ecl8jw8Te+n0mlqiwn2uzhVvGqJKy6Sd2ODMXZbEMP1pLYKwEfg173r3hra+NsiC3v6nv5zCWCHEkgsIrobN1DqOCtDdN3SQ8TuCl9nE9F8uR0/eCW/G9n61DyU/r+zkXeBFuHXp2KvXUyGVUoqvniBusA2AMppA6ub7SJw8Xnicn6nIOqFfIdf6nEhkefyeo8E4X9hijQ51QmQhiwTaL80S6kAeRGA9OReDIKsuYues9bYEUstPpmLkght8lKryoC7s0qrJ7U5pIU6uxYyez5jUJ+0Jms/q0a+GldtMCN5aH2QI1653+RBJL3SQjFPYZ1Yd3pjTJWKVqQM7vZlU1Wi2ElGVznwtZOM1jKYlV+QcZw7gPexdz2X6MK9OyOEYoAEGRTpUsp62Wpu7A0wy+H24M44qSal/GyuRzeMYoHUyKJMkX5ueHmvaiBp56r2xVyNOMG20lXdOM6zDdr60n49gsVuPSkRuvps0G8bZPqHIJPw8KL/SXp/IiLPLsFr7pgXdO9YmqmycLh6XTQgeEy6RwSh5CRqcOTnw4UQouII13whd/LBI/jyzMQuOWYQwLJ52MTums6MUIe4JlLBencyKcX87tFNZYWRg/UpHiUoSFdxTjMNeTxKXcOqXrbvoo4+kicef8THukrrNEhen2aKKfI+3RPUnASG0v/QBjGEtiFtC7zxmZ5HZHvxqe5JMwqliFyO70ZKzD2nNnVP8lOp2ejPUM4uwZVSiC10f6MQ7qBZ6zZ0xzIr/Si3EY133ynDjDWTHCshgapHoxTmT97NUKTQijM2NU0z8ZptD6MK6bWHosiE1b58UY7WQwY+/DOHdScVtRoFTCmTGOFaTfaxxlnKqpYRsgjYVEyYozY4yGC+FvBjjCOFYzee8Bq1kmdwHSuTHCbh8h5GQ121eV3rvJMm6rcrNQU4ZdsOQtZbZcjSpjMBidH2M0nddLMmYmwTEmphT+EYHpop15ZJ3rHa09NqMS7Gy9LOqEIc8Y57sJ/Stce/3Yst5q8nEY/x8vGDzqLQNxygAAAABJRU5ErkJggg==',
//       color: '#f1c232',
//     },
//     {
//       key: '7',
//       name: 'PLATAFORMA ENSINO, MARKET-NETWORK',
//       image: 'https://universida.de/img/universidade_logo.png',
//       color: '#674ea7',
//     },
//     {
//       key: '8',
//       name: 'CERTIFICAÇÃO',
//       image: 'https://certificate.network/img/logo.jpg',
//       color: '#6aa84f',
//     },
//     {
//       key: '9',
//       name: 'GAMIFICAÇÃO',
//       image: 'http://www.andurastudio.com/img/logo.png',
//       color: '#e69138',
//     },
//     {
//       key: '10',
//       name: 'REALIDADE VIRTUAL E AUMENTADA',
//       image:
//         'https://img.freepik.com/free-vector/illustration-virtual-reality-equipment_53876-28435.jpg?size=338&ext=jpg',
//       color: '#a64d79',
//     },
//   ];

//   return (
//     <View style={globalStyles.container}>
//       <FlatList
//         data={Companies}
//         renderItem={({item}) => (
//           <View style={[globalStyles.card, globalStyles.container]}>
//             <View
//               style={[
//                 globalStyles.titleContainer,
//                 {backgroundColor: item.color},
//               ]}>
//               <Text style={globalStyles.companyTitle}>{item.name}</Text>
//             </View>
//             <View>
//               <TouchableOpacity>
//                 <Image
//                   style={globalStyles.image}
//                   source={{
//                     uri: item.image,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
