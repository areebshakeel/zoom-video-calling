import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';


const HEIGHT =Dimensions.get('window').height
const appId = '31fa1a1e775b4ad8a8bb845f4ac6b5bc';
const token = '007eJxTYJjTVOC4tb6c++VjF4dfvqLRMxdOqH/Cqvs4/ID+FG/l+p8KDMaGaYmGiYap5uamSSaJKRaJFklJFiamaSaJyWZJpknJc81aUhsCGRkSnx9lYWSAQBCfhaEktbiEgQEAbM0gfw==';
const uid = Math.floor(Math.random() * 100);
const CallScreen = () => {
    const [channelName, setChannelName] = useState("test")
    const agoraEngineRef = createAgoraRtcEngine(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Me

    function showMessage(msg) {
        setMessage(msg);
    }

    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVideoSDKEngine();
    });

    const setupVideoSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage('Successfully joined the channel ' + channelName);
                    setIsJoined(true);
                    console.log("channel joined");
                },
                onUserJoined: (_connection, Uid) => {
                    showMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    showMessage('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            });
            agoraEngine.enableVideo();
        } catch (e) {
            console.log(e);
        }
    };

    const join = async () => {
        console.log("is joined ",isJoined);
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
        } catch (e) {
            console.log("error in joining", e);
        }
    };
    console.log("is JOINED ", isJoined);
    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('You left the channel');
            console.log("you left the channel -> ")
        } catch (e) {
            console.log("error in leaving", e);
        }
    };
    return <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
            <React.Fragment key={0}>
                <RtcSurfaceView canvas={{ uid: 0 }} style={remoteUid?styles.videoView:styles.videoViewFull} />
                {/* <Text>Local user uid: {uid}</Text> */}
            </React.Fragment>
        ) : (
            <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
            <React.Fragment key={remoteUid}>
                <RtcSurfaceView
                
                    canvas={{ uid: remoteUid }}
                    style={styles.videoView}
                />
                {/* <Text>Remote user uid: {remoteUid}</Text> */}
            </React.Fragment>
        ) : (
            <Text>Waiting for a remote user to join</Text>
        )}
        <Text style={styles.info}>{message}</Text>
        {!isJoined&& <TouchableOpacity onPress={join} style={[styles.joinButton]} >
            <Text style={styles.buttonText} >
                Join Call
            </Text>
        </TouchableOpacity>}
        {isJoined&&<TouchableOpacity onPress={leave} style={[styles.buttonStyle,{backgroundColor:"red"}]} >
            <Text style={styles.buttonText} >
                Leave Call
            </Text>
        </TouchableOpacity>}
    </ScrollView>
}
export default CallScreen
const styles = StyleSheet.create({
    buttonStyle: {
        position:"absolute",
        bottom:100,
        backgroundColor: "blue",
        marginTop: 50,
        width: "50%",
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20
    },
    joinButton: {
        backgroundColor: "#25D366",
        marginTop: 50,
        width: "50%",
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    inputStyle: {
        width: "50%",
        height: 35,
        fontSize: 10,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: { flex: 1, alignItems: 'center' },
    scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
    scrollContainer: { alignItems: 'center' },
    videoView: { width: '100%', height: HEIGHT/2 },
    videoViewFull: { width: '100%', height: HEIGHT },
    btnContainer: { flexDirection: 'row', justifyContent: 'center' },
    head: { fontSize: 20 },
    info: { backgroundColor: '#ffffe0', color: '#0000ff' }
})