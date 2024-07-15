'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Button, duration, FormControl, InputLabel, Input } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect } from 'react';
import { ListeningTest } from '@/utils/postListening'
// import {renderQuestionFields} from './renderQuestion';



const Part1 = (props: any) => {

    const { formData, setFormData, uploadedImage1, setUploadedImage1, uploadedAudio1, setUploadedAudio1, setAnswerMulipleChoice, setAnswerFilling} = props;

    useEffect(() => {
        if (formData.img1 && formData.img1.data && formData.img1.data.length > 0) {
            const imageUrl = formData.img1.data[0].attributes.formats ?
                formData.img1.data[0].attributes.formats.thumbnail.url :
                formData.img1.data[0].attributes.url;
            setUploadedImage1(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${imageUrl} `);
        }
    }, [formData, setUploadedImage1]);

     
    useEffect(() => {
        if (formData.audio1 && formData.audio1.data && formData.audio1.data.length > 0) {
            const audioUrl = formData.audio1.data[0].attributes.formats ?
                formData.audio1.data[0].attributes.formats.thumbnail.url :
                formData.audio1.data[0].attributes.url;
            setUploadedAudio1(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${audioUrl} `);
        }
    }, [formData, setUploadedAudio1]);




    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage1(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, img1: file });
        }
    };



    const handleAudioChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAudio1(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, audio1: file });
        }
    };
    const lt = new ListeningTest();

    return (
      <>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "calc(50% - 16px)" }}>
            <label htmlFor="upload-photo1">
              <input
                style={{ display: "none" }}
                id="upload-photo1"
                name="upload-photo1"
                type="file"
                onChange={handleFileChange1}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
            <span style={{ marginLeft: "8px", color: "rgba(0, 0, 0, 0.54)" }}>
              Upload image
            </span>
            <br />
            <label htmlFor="upload-audio2">
              <input
                style={{ display: "none" }}
                id="upload-audio2"
                name="upload-audio2"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange1}
              />
              <IconButton
                color="primary"
                aria-label="upload audio"
                component="span"
              >
                <AudiotrackIcon />
              </IconButton>
            </label>
            <span style={{ marginLeft: "8px", color: "rgba(0, 0, 0, 0.54)" }}>
              Upload audio
            </span>
          </Box>
          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "up",
              alignItems: "up",
              flexDirection: "column",
            }}
          >
            {uploadedImage1 && (
              <img
                style={{
                  maxWidth: "90%",
                  maxHeight: "65%",
                  objectFit: "contain",
                }}
                src={uploadedImage1}
                alt="Uploaded"
              />
            )}
          </Box>
          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "up",
              alignItems: "up",
              flexDirection: "column",
            }}
          >
            {uploadedAudio1 && (
              <audio controls>
                <source src={uploadedAudio1} type="audio/ogg" />
              </audio>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            mb: 2,
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            label="Question"
            name="question"
            value={formData.question1}
            onChange={(e) =>
              setFormData({ ...formData, question1: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Answer A"
            name="answerA"
            value={formData.isCorrect}
            onChange={(e) =>
                setFormData({ ...formData, isCorrect: e.target.value })
            }
            sx={{ mb: 2 }}
          />
        </Box>
      </>
    );
}
export default Part1;