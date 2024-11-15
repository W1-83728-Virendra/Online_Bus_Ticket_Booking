// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Header = ({ isAuthenticated, onLogout, isAdmin }) => {
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     onLogout();
//     navigation.navigate('Home'); // Navigate to home or another screen on logout
//   };

//   return (
//     <View style={styles.header}>
//       <View style={styles.nav}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.link}>Home</Text>
//         </TouchableOpacity>
//         <View style={styles.rightSection}>
//           {isAuthenticated ? (
//             <>
//               <TouchableOpacity 
//                 style={styles.buttonLogout}
//                 onPress={handleLogout}
//               >
//                 <Text style={styles.buttonText}>Logout</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.link}>User Login</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#343a40',
//     padding: 10,
//   },
//   nav: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     maxWidth: 1200,
//     alignSelf: 'center',
//     width: '100%',
//   },
//   link: {
//     color: '#ffffff',
//     fontSize: 16,
//     marginHorizontal: 10,
//   },
//   rightSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonLogout: {
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#dc3545',
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
// });

// export default Header;


// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Header = ({ isAuthenticated, onLogout, isAdmin }) => {
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     onLogout();
//     navigation.navigate('Home'); // Navigate to home or another screen on logout
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <View style={styles.nav}>
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <Text style={styles.link}>Home</Text>
//           </TouchableOpacity>
//           <View style={styles.rightSection}>
//             {isAuthenticated ? (
//               <>
//                 <TouchableOpacity 
//                   style={styles.buttonLogout}
//                   onPress={handleLogout}
//                 >
//                   <Text style={styles.buttonText}>Logout</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                   <Text style={styles.link}>User Login</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 0, // Ensures SafeAreaView only takes up necessary space
//   },
//   header: {
//     backgroundColor: '#343a40',
//     padding: 10,
//   },
//   nav: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     maxWidth: 1200,
//     alignSelf: 'center',
//     width: '100%',
//   },
//   link: {
//     color: '#ffffff',
//     fontSize: 16,
//     marginHorizontal: 10,
//   },
//   rightSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonLogout: {
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#dc3545',
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
// });

// export default Header;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <View style={styles.rightSection}>
            {isAuthenticated ? (
              <TouchableOpacity 
                style={styles.buttonLogout}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>User Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#343a40',
  },
  header: {
    padding: 10,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  link: {
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogout: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#dc3545',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Header;

